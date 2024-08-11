import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
  const { phoneNumber, pin } = req.body;
  if (!phoneNumber || !pin) {
    return res.status(400).json({
      status: "error",
      message: "phone number and pin are required",
    });
  }

  try {
    const user = await UserModel.findOne({ phoneNumber });
    if (!user || user.pin !== pin) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid phone number or pin" });
    }
    const token = jwt.sign(
      { id: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export default login;

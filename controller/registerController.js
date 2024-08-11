import UserModel from "../models/userModel.js";

// @desc register a new user
// @route POST /api/register
export const registerUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json({
      status: "success",
      result: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

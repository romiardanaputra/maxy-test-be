import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  address: String,
  pin: String,
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;

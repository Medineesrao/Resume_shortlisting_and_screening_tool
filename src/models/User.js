import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobileNumber: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  hrId: { type: String, unique: true, required: true },
  resetToken: String,
  resetTokenExpiry: Date,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

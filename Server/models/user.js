import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Full_Name: {
    type: String,
    trim: true,
    required: true,
  },

  User_Name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Confirm_Password: {
    type: String,
  },
  Profile_Picture: {
    type: String,
  },
  Bio: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);

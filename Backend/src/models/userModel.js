import { model } from "mongoose";
import { Schema } from "mongoose";

const userSchema = Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
      select: false,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);

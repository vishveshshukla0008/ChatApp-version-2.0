import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
  const { password, email, fullname, profilePic } = req.body;
  try {
    if (!password || !email || !fullname) {
      return res.status(400).json({ message: "All fields are requried :" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 Characters long :" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User is already registered | Try Login" });
    }
    // Hash the password :
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      let token = generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({ message: "yesh the user is created !", token });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal server error :" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Both credentials are required !" });
    }
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist " });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(404).json({ message: "password not matched :" });
    }
    let token = generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(400).json({ message: "Internal server error :" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully !" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile Pic is required :" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile :");
    res
      .status(500)
      .json({ message: "Internal Server error on Updating Profile pic:" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth Controller", error.message);
    res.status(500).json({ message: "Internal server error !" });
  }
};

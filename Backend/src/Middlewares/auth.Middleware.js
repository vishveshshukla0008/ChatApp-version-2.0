import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthoriized : can't accessed" });
    }

    const decode = jwt.verify(token, process.env.MY_SECRET);

    if (!decode) {
      return res
        .status(401)
        .json({ message: "Invalid token : can't accessed" });
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found !" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in isLoggedIn Middleware" + error);
    res.status(500).json({ message: "internal server error ;" });
  }
};

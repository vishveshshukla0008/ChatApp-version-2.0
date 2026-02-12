import express from "express";
import { isLoggedIn } from "../Middlewares/auth.Middleware.js";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.Controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", isLoggedIn,  updateProfile);
router.get("/check", isLoggedIn, checkAuth);

export default router;

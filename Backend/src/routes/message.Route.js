import express from "express";
import { isLoggedIn } from "../Middlewares/auth.Middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controller/message.Controller.js";
const router = express.Router();

router.get("/users", isLoggedIn, getUsersForSidebar);

router.get("/:id", isLoggedIn, getMessages);

router.post("/send/:id", isLoggedIn, sendMessage);

export default router;

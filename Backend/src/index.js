import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.Route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.Route.js";
import cors from "cors";
import { app, server } from "./lib/scoket.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS (only needed in development)
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

// Port Fix
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});

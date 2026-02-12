import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://192.168.219.96:5173",
  },
});

export function getReceiverSocketId(userId) {
  return onlineUserSocketMap[userId];
}

//used for fetching the online users :
const onlineUserSocketMap = {};

io.on("connection", (socket) => {
  console.log("Client is connected on server side !", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) onlineUserSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected Clients :

  io.emit("getOnlineUsers", Object.keys(onlineUserSocketMap));
  socket.on("disconnect", () => {
    console.log("disconnected on server-side ! ", socket.id);
    delete onlineUserSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUserSocketMap));
  });
});

export { io, app, server };

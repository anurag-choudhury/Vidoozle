import { Socket } from "socket.io";
import http from "http";
import { Server } from 'socket.io';
import express from 'express';
import { UserManager } from "./managers/UserManger"; // Corrected typo from UserManger to UserManager

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const userManager = new UserManager();

io.on('connection', (socket: Socket) => {
  console.log('a user connected', socket.handshake.query['name']);
  userManager.addUser(socket.handshake.query['name'] as string, socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  });
  socket.on("close", () => {
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  });
  socket.on("leave", () => {
    // remove room
    userManager.userLeft(socket.id);
  });
});

// Add a GET route on the root
app.get('/', (req, res) => {
  res.send('Welcome to the Socket.IO server!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

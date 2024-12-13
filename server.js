const express = require('express');
const http = require('http');
const { env } = require('process');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Real-Time Collaboration Backend');
});

// Handle connections and broadcasting
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for code changes and broadcast them
  socket.on('codeChange', (data) => {
    socket.broadcast.emit('codeChange', data); // Broadcast code change to all other users
  });

  // Listen for cursor position changes and broadcast them
  socket.on('cursorMove', (data) => {
    socket.broadcast.emit('cursorMove', data); // Broadcast cursor position
  });

  // Listen for chat messages and broadcast them
  socket.on('chatMessage', (message) => {
    socket.broadcast.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (e.g., index.html, JS, CSS) from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// 👇 Route for "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('✅ A user connected:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('💬 Message received:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('❌ A user disconnected:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

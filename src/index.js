const http = require("http");
const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const {generateMessage}= require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3030;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

//emit sends an event while on listens an event.

io.on("connection", (socket) => {
  console.log("New web socket connection!");

  socket.emit('message', generateMessage("Welcome!"));

  socket.on("sendMessage", (message, callback) => {
    io.emit("message", generateMessage(message));
    callback();
  });

});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
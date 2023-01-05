const socket = io();

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message);
});

socket.on("receiveMessage", (message) => {
  console.log(message);
});

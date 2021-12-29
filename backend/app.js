const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const nanoid = require("nanoid");

// console.log(app.request);
// const user = app.request.query.user;

io.on("connection", (socket) => {
  socket.on("message", ({ message }) => {
    const user = socket.handshake.query.user;
    const id = nanoid.nanoid();
    io.emit("messageBack", { id, name: user, message });
  });

  socket.on("disconnect", () => {
    const user = socket.handshake.query.user;
    io.emit("messageBack", { name: user });
  });
});

http.listen(3000, function () {
  console.log("listening on port 3000");
});

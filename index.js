const http = require("http");
const express = require("express");
const path = require("path");

const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Socket.io Handling
io.on("connection", (socket) => {
  //   console.log(socket);
    socket.broadcast.emit("user", "hi");
  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);
  });
    // socket.on("chat message", (msg) => {
    //   io.emit("chat message", msg);
    // });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => {
  console.log(`Server Started At PORT 9000`);
});

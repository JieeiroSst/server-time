const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

io.on("connection", function (socket) {
  console.log("connection from client to server" + socket.id);

  socket.on("disconnect", function () {
    console.log(socket.id + "client discoonect server");
  });

  socket.on("Client-send-data", function (data) {
    console.log(socket.id + "send:" + data);
    io.sockets.emit("server-send-data" + data + ".");
  });
});

app.get("/", (w, r) => {
  r.render("trangchu");
});

const port = 9000 || process.env.PORT;

app.listen(port, () => {
  console.log("runnig port "+port);
});

let socketIO = require("socket.io");
let msgController = require("./controllers/message_controller");
const messages = require("./db/models/messages");

module.exports = (app, server) => {
  server.get("/messages/shop/:id", msgController.load);
  let messageApp = socketIO(app);

  messageApp.on("connection", (socket) => {
    socket.on("send", async (msg) => {
      console.log(msg);
      msgController.send(msg).then((pl) => {
        let { status, message } = pl;
        if (status) {
          socket.emit("send", message);
        }
      });
    });
  });
};

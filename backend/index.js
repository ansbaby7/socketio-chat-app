const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user")
const messagesRoutes = require("./routes/messages")
const socket = require("socket.io")

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/user",userRoutes)
app.use("/api/messages",messagesRoutes)

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});

const io = socket(server,{
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})

global.onlineUsers = new Map()

io.on("connection", (socket) => {
  global.chatSocket = socket
  socket.on("add-user",(userId) => {
    onlineUsers.set(userId, socket.id)
  })

  socket.on("send-msg", (msgData) => {
    const sendUserSocket = onlineUsers.get(msgData.to)

    if(sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", msgData.msg)
    }
  })
})
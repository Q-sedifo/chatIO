const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const { nanoid } = require('nanoid');
const cors = require("cors")

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(express.json())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

const rooms = new Map()

app.get("/rooms", (req, res) => {
  return res.json(Array.from(rooms.values()))
})

app.post("/rooms", (req, res) => {
  const user = JSON.parse(req.headers["x-user"])
  const id = nanoid()

  const newRoom = {
    id,
    name: "",
    creator: user,
    messages: [],
    isPrivate: false
  };

  rooms.set(id, newRoom);
  return res.json({ success: true, newRoom })
})

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`)
  const user = socket.handshake.auth

  // Sending message to room
  socket.on("sendMessage", ({ roomId, message }) => {
    if (!roomId || !message) return

    io.to(roomId).emit("newMessage", {
      id: nanoid(),
      text: message,
      sender: user,
      timestamp: new Date().toISOString(),
    })
  })

  // Joining the room
  socket.on("joinRoom", ({ roomId }) => {
    const room = rooms.get(roomId)

    if (!room) {
      socket.emit("errorJoin", { error: "This room does not exist" })
      return
    }

    socket.join(roomId)
    socket.emit("joinedRoom", room)
    socket.to(roomId).emit("userJoined", user)
  })

  // Leaving room
  socket.on("leaveRoom", ({ roomId }) => {
    socket.leave(roomId)
    socket.to(roomId).emit("userLeaved", user)
  })
})

server.listen(3001, () => {
  console.log("Server is running")
})
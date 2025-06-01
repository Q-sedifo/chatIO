const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

const rooms = new Set()

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`)

  // Sending message to room
  socket.on("sendMessage", ({ roomName, message }) => {
    if (!roomName || !message) return

    io.to(roomName).emit("newMessage", {
      message,
      sender: socket.id,
      timestamp: new Date().toISOString(),
    })
  })

  // Getting rooms
  socket.on("getRooms", () => {
    socket.emit("roomsList", Array.from(rooms))
  })

  // Join room
  socket.on("joinRoom", ({ roomName }) => {
    if (!rooms.has(roomName)) {
      socket.emit("errorJoin", { error: "This room does not exist" })
      return
    }

    socket.join(roomName)
    socket.emit("joinedRoom", { roomName })
    socket.to(roomName).emit("userJoined", { id: socket.id })
  })

  // Leaving room
  socket.on("leaveRoom", ({ roomName }) => {
    socket.leave(roomName)
  })

  // Creating new room
  socket.on("createRoom", (data) => {
    const { name } = data
    if (rooms.has(name)) return
    
    rooms.add(name)
    io.emit("roomCreated", { name })
  })
})

server.listen(3001, () => {
  console.log("Server is running")
})
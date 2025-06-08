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
    users: [],
    isPrivate: false
  }

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
  socket.on("joinRoom", (roomId) => {
    const room = rooms.get(roomId)

    if (!room || !user?.id) {
      socket.emit("errorJoin", { error: "This room does not exist" })
      return
    }

    socket.join(roomId)

    if (!room.users.find((cUser) => cUser.id === user.id)) {
      room.users.push(user)
    }

    io.to(roomId).emit("joinedRoom", { room, user })
  })

  // Leaving room
  socket.on("leaveRoom", ( roomId ) => {
    const room = rooms.get(roomId)
    if (!room) return

    socket.leave(roomId)

    room.users = room.users.filter((cUser => cUser.id !== user.id))

    socket.to(roomId).emit("userLeaved", { room, user })
  })
})

server.listen(3001, () => {
  console.log("Server is running")
})
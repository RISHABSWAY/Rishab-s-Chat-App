const express = require('express')
const dotenv = require('dotenv')
const chats = require('../backend/data/data.js')
const connectDB = require('../backend/Db/db.js')
const colors = require('colors')
const userRoutes = require('../backend/Routes/userRoutes.js')
const chatRoutes = require('../backend/Routes/chatRoutes.js')
const adminRoutes = require('../backend/Routes/adminRoutes.js')
const messageRoutes = require('../backend/Routes/messageRoutes.js')
const { notFound } = require('./Middleware/errorMiddleware.js')
const cors = require('cors')
const { Socket } = require('socket.io')


const corsOption = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors(corsOption));


app.get('/', (req,res)=> {
  res.send("API is Running")
})


app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/admin', adminRoutes)


app.use(notFound)

const PORT = process.env.PORT || 7069 
const server = app.listen(PORT, console.log(`Server Started on port ${PORT}`.yellow.bold ))

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  }
})

io.on("connection", (socket)=> {
  console.log("connected to socket")

  socket.on('setup', (userData)=> {
    socket.join(userData._id)
    console.log(userData._id)
    socket.emit("connected")
  })

  socket.on('join chat', (room)=> {
    socket.join(room);
    console.log("User Joined Room " + room)
  })

  socket.on('typing', (room)=> socket.in(room).emit("typing"));
  socket.on('stop typing', (room)=> socket.in(room).emit("stop typing"));

  socket.on('new message', (newMessageReceived)=> {
    var chat = newMessageReceived.chat;
    if(!chat.users) return console.log("chat.users not defined")

    chat.users.forEach(user => {
      if(user._id == newMessageReceived.sender._id) return ;

      socket.in(user._id).emit('message recieved', newMessageReceived)
    })
  })
  socket.off('setup', ()=> {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id)
  })
})
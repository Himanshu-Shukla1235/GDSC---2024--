require('dotenv').config();
require('express-async-errors');
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app); // Create an HTTP server
const io = require('socket.io')(server,{ cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }}); // Initialize Socket.IO
const testRouter = require('./Routes/test');
const errorHandlerMiddleware = require('./Middlewares/errorHandlerMiddleware');
const notFound = require('./Middlewares/notFound');
const connectDB = require('./DB/connect');
const authRouter = require('./Routes/auth');
const messagesRouter = require('./Routes/messages');
const roomsRouter = require('./Routes/chatRooms');
const cors = require('cors');
const feedRouter=require('./Routes/feed')
//----------------------------------------------------cors-------------------------------------->>>

//---------------------------------------------------middlewares--------------------------------->>>

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.io = io;
    next();
});


//routes
app.use('/api/v1/test', testRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/messages', messagesRouter);
app.use('/api/v1/chat', roomsRouter);
app.use('/api/v1/feed',feedRouter);
//errors
app.use(notFound);
app.use(errorHandlerMiddleware);

//--------------------------------------------------app start function--------------------------->>>
const PORT = process.env.port || 5000;



// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected');
    cors:{
      origin:['http://localhost:5173']
    }
    

   socket.on('send-message', (data) => {
        console.log('Received a message:',data);

        // Your logic to handle the received message goes here

        // You can also broadcast the message to other connected clients
        io.emit('broadcast-message', data);
    });
    // Handle Socket.IO events here

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



const start = async () => {
    try {
        await connectDB(process.env.mongoURI);

        // Use the server instance to listen for incoming connections
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();

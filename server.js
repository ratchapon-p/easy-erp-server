import app from "./app/app.js";
import { createServer } from 'http'
import dotenv from 'dotenv';
import { Server } from "socket.io";
import { setSocketIO } from "./sockets/socket.js";
dotenv.config();

const server = createServer(app)
const PORT = process.env.SERVER_PORT
const client_url = process.env.CLIENT_URL || 'http://localhost:5173'

const io = new Server(server, {
    cors: {
        origin: client_url,
        methods: ['GET','POST']
    }
})

setSocketIO(io)

io.on('connection', (socket) =>{
    console.log(client_url,'connected!');

    socket.on('disconnect',() =>{
        console.log(client_url,'disconnected!');
    })
})

server.listen(PORT,() =>{
    console.log(`Server is listen on port : ${PORT}`);
})
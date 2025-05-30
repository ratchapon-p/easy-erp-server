import app from "./app/app.js";
import { createServer } from 'http'
import dotenv from 'dotenv';
dotenv.config();

const server = createServer(app)
const PORT = process.env.SERVER_PORT

server.listen(PORT,() =>{
    console.log(`Server is listen on port : ${PORT}`);
})
import 'dotenv/config'
import prisma from './config/db.js'
import app from './app.js';
import { Server } from 'socket.io';
import http from 'http';

let io; 

async function startServer() {
  try {
    const server = http.createServer(app);

    io = new Server(server, {
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
      }
    });

    io.on('connection', (socket) => {
      const { userEmail } = socket.handshake.auth;
      if(userEmail){
        socket.join(`user-${userEmail}`)
        console.log(`user ${userEmail} is connected in room user-${userEmail}`);
      }
    });

    await prisma.$connect();
    console.log("Connected to DB!");

    server.listen(3000, () => {
      console.log("App running!");
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();

export { io };

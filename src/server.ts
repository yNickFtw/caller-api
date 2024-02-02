require('dotenv').config();
import 'reflect-metadata';
import "./shared/container";
import express from 'express';
import cors from 'cors';
import AssociationConfig from './database/association-config';
import database from './database/config';
import MainRouter from './shared/http/router';
import { Server, Socket } from 'socket.io';

const app = express();

app.use(express.json());
app.use(cors());
app.use(new MainRouter().init());

const io: Server = require('socket.io')(8000, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  console.log("User connected! ", socket.id);

  const roomId = socket.handshake.query.roomId as any;
  const serverRoomId = socket.handshake.query.serverRoomId as any;

  socket.join(roomId);

  socket.on('newMessage', (message) => {

    io.to(roomId).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log("User disconnected! ", socket.id);
  });


  socket.on('newMessageOnServer', (channel) => {
    console.log(channel)

    io.to(serverRoomId).emit('newMessageOnServer', channel);
  })

  socket.on('newChannelCreated', (channel) => {
    io.to(serverRoomId).emit(channel);
  })

});

const port = process.env.PORT

new AssociationConfig().init(() => {
  database.sync({ force: false })
    .then(() => {
      app.listen(port, () => {
        console.log("API RUNNING!")
      })
    })
    .catch((err) => {
      if (err) {
        console.log("Wops, something wrong! " + err);
      }
    })
})
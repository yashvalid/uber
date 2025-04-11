const socketIO = require('socket.io');
const User = require('./model/user'); 
const Captain = require('./model/captain.model');

let io;

async function initailizeSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  io.on('connection', (socket) => {
    socket.on('join', async (data) => {
        const { userId, userType } = data;
        if(userType === 'user') {
          await User.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if(userType === 'captain') {
          await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
        }
    })

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;
      if(!location || !location.lng || !location.ltd) return;
      const cap = await Captain.findByIdAndUpdate(userId, { location : {
        ltd : location.ltd,
        lng : location.lng,
      } });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  console.log("Sending message to socketId:", socketId, message.event, message.data);
  if (io) {
    io.to(socketId).emit(message.event, message.data);
  } else {
    console.error("Socket not initialized");
  }
}

module.exports = {
  initailizeSocket,
  sendMessageToSocketId,
};
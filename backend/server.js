import { Server } from 'socket.io';

const server = new Server(8000, {
  cors: {
    origin: '*',
  },
});

let sequenceNumberByClient = new Map();

server.on('connection', socket => {
  console.info(`Client connected [id=${socket.id}]`);
  // initialize this client's sequence number
  sequenceNumberByClient.set(socket, 1);

  setTimeout(() => {
    server.emit('message', { ACTION_TYPE: 'SOME_ACTION', data: { value: 'data' } });
  }, 10000);

  // when socket disconnects, remove it from the list:
  socket.on('disconnect', () => {
    sequenceNumberByClient.delete(socket);
    console.info(`Client gone [id=${socket.id}]`);
  });
});

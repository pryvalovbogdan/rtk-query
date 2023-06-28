import { Server } from 'socket.io';

const server = new Server(8000, {
  cors: {
    origin: '*',
  },
});

let sequenceNumberByClient = new Map();

// event fired every time a new client connects:
server.on('connection', socket => {
  console.info(`Client connected [id=${socket.id}]`);
  // initialize this client's sequence number
  sequenceNumberByClient.set(socket, 1);

  setInterval(() => {
    server.emit('message', { ACTION_TYPE: 'SOME_ACTION', data: { value: 'data' } });
  }, 10000);

  // when socket disconnects, remove it from the list:
  socket.on('disconnect', () => {
    sequenceNumberByClient.delete(socket);
    console.info(`Client gone [id=${socket.id}]`);
  });
});

setTimeout(() => {
  server.emit('SOME_ACTION2', { data: 'data' });
}, 3000);

// // sends each client its current sequence number
// setInterval(() => {
//   for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
//     client.emit('seq-num', sequenceNumber);
//     sequenceNumberByClient.set(client, sequenceNumber + 1);
//   }
// }, 1000);

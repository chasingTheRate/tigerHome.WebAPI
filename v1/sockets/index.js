const blindSockets = require('./blindSockets');
const catchAllSockets = require('./catchAllSockets');

module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    console.log('connected');
    blindSockets(socket);
    catchAllSockets(socket);
  });
}
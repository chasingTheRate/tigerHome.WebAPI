
module.exports = (socket) => {
  socket.on('disconnect', () => {
    console.log('socket disconnected...');
  })
}
const debug = require('debug')('blindSockets');
const BlindsController = require('../controllers/blindsController');
const schema = require('../schema');

const blindsController = new BlindsController();

const GET_BLINDS = 'getBlinds';
const OPEN_BLIND = 'openBlind';
const CLOSE_BLIND = 'closeBlind';
const BLIND_LIST_UPDATED = 'blindListUpdated';
const ERROR_BLIND = 'errorBlind';

const getBlindList = (socket) => {
  BlindsController.getBlinds()
    .then((data) => {
      debug(`BLIND_LIST_UPDATED - data: ${ JSON.stringify(data, null, 1) }`);
      socket.emit(BLIND_LIST_UPDATED, data);
    })
    .catch((err) => {
      debug(`GET_BLINDS Error - Error: ${ err }`);
      socket.emit(ERROR_BLIND, err);
    })
}

module.exports = (socket) => {
  socket.on(GET_BLINDS, () => {
    debug(`GET_BLINDS`);
    getBlindList(socket);
  }),
  socket.on(OPEN_BLIND, (data) => {
    debug(`OPEN_BLIND - data: ${ JSON.stringify(data, null, 1) }`);
    blindsController.openBlind(data.id)
    .then(() => {})
    .catch((err) => {
      console.log(`Open Blind Error: ${ err }`);
    })
  }),
  socket.on(CLOSE_BLIND, (data) => {
    debug(`CLOSE_BLIND - data: ${ JSON.stringify(data, null, 1) }`);
    blindsController.closeBlind(data.id)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    })
  })
}
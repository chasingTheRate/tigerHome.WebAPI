const debug = require('debug')('blindsController');
const axios = require('axios');
const qs = require('qs');
const config = require('../../config');
const blindsDB = require('../db/blindsDB');
const Blind = require('../model/blind');
const environmentType = require('../model/environmentTypes')

const TIMEOUT = 25000;
const DELAY = 30;
const env = config.env;

const getUniqueIpAddresses = (blinds) => {
  return [...new Set(blinds.map(blind => blind.ipAddress))];
}

const pingPeripherals = (ipAddresses) => {
  let statusRequests = [];
  ipAddresses.forEach(ipAddress => {
    statusRequests.push(axios.get(`http://${ ipAddress }:80/status`));
  })
  return Promise.all(statusRequests);
}

class BlindsController {
  constructor() {
  }

  static getBlinds() {
    debug(`getBlinds`);
    return blindsDB.getAllBlindRecords();
  }

  closeBlind(id){
    debug(`closeBlind - id: ${ id }`);
    return this.changeBlindState(id, Blind.blindState.closed);
  }

  static addBlind(data) {
    debug(`addBlind - data: ${ JSON.stringify(data, null, 1) }`);
    return blindsDB.addBlind(data);
  }

  static removeBlind(id) {
    debug(`removeBlind - id: ${ id }`);
    return blindsDB.removeBlindWithID(id);
  }

  static setBlindPositionAtIpAddress(ipAddress, params){
    const options = {
      timeout: TIMEOUT
    };
    if (env === environmentType.production) {
      return axios.post(`http://${ ipAddress }:80/setPositionForServoAtPort`, qs.stringify(params), options);
    } else {
      return Promise.resolve();
    }
  }

  static openBlind(id) {
    debug(`openBlind - id: ${ id }`);
    let position = 0;
    return blindsDB.getBlindWithId(id)
    .then((blind) => {
      console.log(blind);
      const { ipAddress, positionLimitOpen, currentPosition, port } = blind[0];
      position = positionLimitOpen;
      const params = {
        currentPosition,
        'targetPosition': positionLimitOpen,
        port,
        'delay': 30
      };
      return BlindsController.setBlindPositionAtIpAddress(ipAddress, params);
    })
    .then(() => {
      return BlindsController.updateBlindState(id, 'open', position);
    })
  }

  static closeBlind(id) {
    debug(`closeBlind - id: ${ id }`);
    let position = 0;
    return blindsDB.getBlindWithId(id)
    .then((blind) => {
      const { ipAddress, positionLimitClosed, currentPosition, port } = blind[0];
      const params = {
        currentPosition,
        'targetPosition': positionLimitClosed,
        port,
        'delay': 30
      };
      return BlindsController.setBlindPositionAtIpAddress(ipAddress, params);
    })
    .then(() => {
      return BlindsController.updateBlindState(id, 'closed', position);
    })
  }

  willChangeBlindState(id, targetState) {
    debug(`willChangeBlindState - id: ${ id }, targetState: ${ targetState }`);
    var state = '';
    if (targetState == Blind.blindState.open) {
      state = Blind.blindState.opening;
    } else {
      state = Blind.blindState.closing;
    }
    return this.updateBlindState(id, state);
  }

  static updateBlindState(id, state, position) {
    debug(`updateBlindState - id: ${ id }, state: ${ state }, position: ${ position }`);
    return blindsDB.updateBlindState(id, state, position)
  }

  static setPosition(id, targetPosition) {
    debug(`setPosition - id: ${ id }, targetPosition: ${ targetPosition }`);
    return blindsDB.getBlindWithID(id)
    .then((blind) => {
      return BlindsController.setPositionWithBlind(blind, targetPosition);
    })
  }

  static setPositionWithBlind(blind, targetPosition) {
    const { ipAddress, currentPosition, port } = blind[0];
    const params = {
      currentPosition,
      'targetPosition': targetPosition,
      port,
      'delay': DELAY
    };
    const options = {
      timeout: TIMEOUT
    };
    return axios.post(`http://${ ipaddress }:80/setPositionWithPort`, qs.stringify(params), options);
  }

  static setOpenAngleLimit(id, targetPosition) {
    debug(`setOpenAnglePosition - id: ${ id }, targetPosition: ${ targetPosition }`);
    return blindsDB.getBlindWithID(id)
    .then((blind) => {
      return BlindsController.setPositionWithBlind(blind, targetPosition);
    })
    .then((response) => {
      return blindsDB.setOpenAngleLimit(id, targetPosition)
    })
  }

  static setClosedAngleLimit(id, targetPosition) {
    debug(`setOpenAnglePosition - id: ${ id }, targetPosition: ${ targetPosition }`);
    return blindsDB.getBlindWithID(id)
    .then((blind) => {
      return BlindsController.setPositionWithBlind(blind, targetPosition);
    })
    .then((response) => {
      return blindsDB.setClosedAngleLimit(id, targetPosition)
    })
  }

  static status(id) {
    debug(`status - id: ${ id }`);
    return blindsDB.status(id);
  }

  static currentPosition(id) {
    debug(`currentPosition - id: ${ id }`);
    return blindsDB.currentPosition(id);
  }

  static peripheralStatus() {
    debug(`peripheralStatus`);
    return blindsDB.getAllBlindRecords()
    .then( (blinds) => {
      const ipAddresses = getUniqueIpAddresses(blinds);
      return pingPeripherals(ipAddresses);
    });
  }
}

module.exports = BlindsController;

const debug = require('debug')('blindsController');
const axios = require('axios');
const qs = require('qs');
const blindsDB = require('../db/blindsDB');
const Blind = require('../model/blind');
const Pin = require('../model/pin');

const TIMEOUT = 25000;
const OPEN_VALUE = 120;
const CLOSED_VALUE = 0;
const DELAY = 30;


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

  static openBlind(id) {
    debug(`openBlind - id: ${ id }`);
    let position = 0;
    return blindsDB.getBlindWithID(id)
    .then((blind) => {
      console.log(blind);
      const { ip_address, position_limit_open, position_current, port } = blind[0];
      position = position_limit_open;
      const params = {
        'currentPosition': position_current,
        'targetPosition': position_limit_open,
        'port': port,
        'delay': 30
      };
      const options = {
        timeout: TIMEOUT
      };
      return axios.post(`http://${ ip_address }:80/setPositionForServoAtPort`, qs.stringify(params), options);
    })
    .then((response) => {
      return BlindsController.updateBlindState(id, 'open', position);
    })
  }

  static closeBlind(id) {
    debug(`closeBlind - id: ${ id }`);
    let position = 0;
    return blindsDB.getBlindWithID(id)
    .then((blind) => {
      const { ip_address, position_limit_closed, position_current, port } = blind[0];
      position = position_limit_closed;
      const params = {
        'currentPosition': position_current,
        'targetPosition': position_limit_closed,
        'port': port,
        'delay': 30
      };
      const options = {
        timeout: TIMEOUT
      };
      return axios.post(`http://${ ip_address }:80/setPositionForServoAtPort`, qs.stringify(params), options);
    })
    .then((response) => {
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

  static setPosition(blindid, targetPosition) {
    debug(`setPosition - id: ${ blindid }, targetPosition: ${ targetPosition }`);
    return blindsDB.getBlindWithID(blindid)
    .then((blind) => {
      return BlindsController.setPositionWithBlind(blind, targetPosition);
    })
  }

  static setPositionWithBlind(blind, targetPosition) {
    const { ipaddress, currentPosition, port } = blind[0];
    const params = {
      'currentPosition': currentPosition,
      'targetPosition': targetPosition,
      'port': port,
      'delay': DELAY
    };
    console.log(params);
    const options = {
      timeout: TIMEOUT
    };
    return axios.post(`http://${ ipaddress }:80/setPositionWithPort`, qs.stringify(params), options);
  }

  static setOpenAngleLimit(blindid, targetPosition) {
    debug(`setOpenAnglePosition - id: ${ blindid }, targetPosition: ${ targetPosition }`);
    return blindsDB.getBlindWithID(blindid)
    .then((blind) => {
      return BlindsController.setPositionWithBlind(blind, targetPosition);
    })
    .then((response) => {
      return blindsDB.setOpenAngleLimit(blindid, targetPosition)
    })
  }

  static setClosedAngleLimit(blindid, targetPosition) {
    debug(`setOpenAnglePosition - id: ${ blindid }, targetPosition: ${ targetPosition }`);
    return blindsDB.getBlindWithID(blindid)
    .then((blind) => {
      return BlindsController.setPositionWithBlind(blind, targetPosition);
    })
    .then((response) => {
      return blindsDB.setClosedAngleLimit(blindid, targetPosition)
    })
  }

  static status(blindid) {
    debug(`status - id: ${ blindid }`);
    return blindsDB.status(blindid);
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

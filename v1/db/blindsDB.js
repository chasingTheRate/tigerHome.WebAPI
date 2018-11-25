const debug = require('debug')('blindsDB');
const uuid = require('uuid');
const knex = require('knex')({
  client: 'pg',
  version: '9.4',
  connection: {
    host : '192.168.86.38',
    user : 'pi',
    password : 'raspberry',
    database : 'tiger'
  },
  acquireConnectionTimeout: 10000
});

const getAllBlindRecords = () => {
  return knex.select(
    'blind_id as blindId',
    'blind_name as blindName',
    'room',
    'blind_state as blindState',
    'position_current as positionCurrent',
    'ip_address as ipAddress',
    'port',
    'position_limit_open as positionLimitOpen',
    'position_limit_closed as positionLimitClosed')
    .from('blinds');
}

const getBlindWithID = (id) => {
  debug(`getBlindWithID - id: ${ id }`);
  return knex.select('*').from('blinds').where({ blind_id: id });
}

const updateBlindState = (id, state, position) => {
  debug(`updateBlindState - id: ${ id }, state: ${ state }, position: ${ position }`);
  return knex('blinds').where({ blind_id: id }).update({ blind_state: state, position_current: position  })
}

const addBlind = (data) => {
  debug(`addBlind - data: ${ JSON.stringify(data, null, 1) }`);

  const { 
    ipAddress: ip_address, 
    name: blind_name = '', 
    room = '', blindState: 
    blind_state = 'unknown', 
    port: port, 
    positionCurrent: position_current = 0,
    positionLimitOpen: position_limit_open = 90,
    positionLimitClosed: position_limit_closed = 0
  } = data;

  // const blindid = uuid(); 
  return knex('blinds').insert({
    blind_id: uuid(),
    ip_address,
    blind_name,
    room,
    blind_state,
    port,
    position_current,
    position_limit_open,
    position_limit_closed
  })
}

const removeBlindWithID = (id) => {
  return knex('blinds')
  .where({ blind_id: id })
  .del();
}

const setOpenAngleLimit = (id, angle) => {
  debug(`setOpenAngleLimit - id: ${ id }, angle: ${ angle }`);
  return knex('blinds').where({ blind_id: id }).update({ position_limit_open: angle })
}

const setClosedAngleLimit = (id, angle) => {
  debug(`setClosedAngleLimit - id: ${ id }, angle: ${ angle }`);
  return knex('blinds').where({ blind_id: id }).update({ position_limit_closed: angle })
}

const status = (id) => {
  debug(`status - id: ${ id }`);
  return knex.select('blind_state as blindState').from('blinds').where({ blind_id: id });
}

module.exports = {
  getAllBlindRecords,
  getBlindWithID,
  updateBlindState,
  addBlind,
  removeBlindWithID,
  setOpenAngleLimit,
  setClosedAngleLimit,
  status
};

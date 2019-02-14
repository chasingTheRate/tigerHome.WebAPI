const debug = require('debug')('blindsDB');
const config = require('../../config');
const uuid = require('uuid');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : config[config.env].dbHost,
    user : config[config.env].dbUsername,
    password : config[config.env].dbPassword,
    database : config[config.env].dbDatabaseName,
  },
  acquireConnectionTimeout: 10000
});

const getAllBlindRecords = () => {
  return knex.select(
    'id',
    'name',
    'roomId',
    'blindState',
    'currentPosition',
    'ipAddress',
    'port',
    'positionLimitOpen',
    'positionLimitClosed')
    .from('blinds');
}

const getBlindWithId = (id) => {
  debug(`getBlindWithID - id: ${ id }`);
  return knex.select('*').from('blinds').where({ id });
}

const updateBlindState = (id, state, position) => {
  debug(`updateBlindState - id: ${ id }, state: ${ state }, position: ${ position }`);
  return knex('blinds').where({ id }).update({ blindState: state, currentPosition: position  })
}

const addBlind = (data) => {
  debug(`addBlind - data: ${ JSON.stringify(data, null, 1) }`);

  const { 
    ipAddress, 
    name = '', 
    roomId = null,
    blindState = 'unknown', 
    port: port, 
    currentPosition = 0,
    positionLimitOpen = 90,
    positionLimitClosed = 200
  } = data;

  // const blindid = uuid(); 
  return knex('blinds').insert({
    id: uuid(),
    ipAddress,
    name,
    roomId,
    blindState,
    port,
    currentPosition,
    positionLimitOpen,
    positionLimitClosed
  }, 'id')
}

const removeBlindWithID = (id) => {
  return knex('blinds')
  .where({ id })
  .del();
}

const setOpenAngleLimit = (id, angle) => {
  debug(`setOpenAngleLimit - id: ${ id }, angle: ${ angle }`);
  return knex('blinds').where({ id }).update({ positionLimitOpen: angle })
}

const setClosedAngleLimit = (id, angle) => {
  debug(`setClosedAngleLimit - id: ${ id }, angle: ${ angle }`);
  return knex('blinds').where({ id }).update({ positionLimitClosed: angle })
}

const status = (id) => {
  debug(`status - id: ${ id }`);
  return knex.select('blindState').from('blinds').where({ id });
}

module.exports = {
  getAllBlindRecords,
  getBlindWithId,
  updateBlindState,
  addBlind,
  removeBlindWithID,
  setOpenAngleLimit,
  setClosedAngleLimit,
  status
};

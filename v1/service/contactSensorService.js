const debug = require('debug')('contactSensorService');
const ContactSensorController = require('../controllers/contactSensorController');
const schema = require('../schema');

const isValidBodyParam = (param) => {
  if (!param) {
    return false
  }
  return true
}

const getContactSensors = (req, res) => {
  debug('getContactSensors');
  
  ContactSensorController.getContactSensors()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((error) => {
    console.error(error);
  });
}

const didChangeState = (req, res) => {
  debug('didChangeState');
  
  const payload  = req.body;

  console.log(payload);
  
  ContactSensorController.didChangeState(payload)
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((error) => {
    console.error(error);
  });
}

module.exports = {
  getContactSensors,
  didChangeState,
}

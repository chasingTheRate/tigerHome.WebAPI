const debug = require('debug')('healthCheckService');

const status = (req, res) => {
  debug('status');
  res.sendStatus(200);
}

module.exports = {
  status,
}
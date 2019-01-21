const debug = require('debug')('blindService');
const BlindsController = require('../controllers/blindsController');
const schema = require('../schema');

const getBlinds = (req, res) => {
  debug('getBlinds');
  BlindsController.getBlinds()
  .then((results) => {
    res.status(200).json(results);
  });
}

const addBlind = (req, res) => {
  debug('addBlind');
  const blindData = req.body;
  const valid = schema.validate(schema.blindSchema, blindData);
  if (!valid) {
    return res.sendStatus(400);
  }
  BlindsController.addBlind(blindData)
  .then((results) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
}

const removeBlind = (req, res) => {
  debug('removeBlind');
  const id = req.body.id;
  if (!id) {
    return res.sendStatus(400);
  }
  BlindsController.removeBlind(id)
  .then((results) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
}

const updateBlindWithId = (req, res) => {
  debug('updateBlindWithId');
  res.sendStatus(200);
}

const openBlind = (req, res) => {
  debug('openBlind');
  if (!req.body.id) {
    return res.sendStatus(400);
  }
  const id = req.body.id;

  if (!id) {
    return res.sendStatus(400);
  }
  
  BlindsController.openBlind(id)
  .then((results) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(`BlindsController OpenBlind Error: ${ err }`);
    res.sendStatus(500);
  })
}

const closeBlind = (req, res) => {
  debug('closeBlind');
  if (!req.body.id) {
    return res.sendStatus(400);
  }
  const id = req.body.id;
  
  if (!id) {
    return res.sendStatus(400);
  }
  
  BlindsController.closeBlind(id)
  .then((results) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(`BlindsController CloseBlind Error: ${ err }`);
    res.sendStatus(500);
  })
}

const setPosition = (req, res) => {
  debug('setPosition');

  const { id, targetPosition }  = req.body;
  
  if (!id || !targetPosition) {
    return res.sendStatus(400);
  }
  
  BlindsController.setPosition(blindid, targetPosition)
  .then((results) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(`BlindsController setPosition Error: ${ err }`);
    res.sendStatus(500);
  })
}

const setOpenAngleLimit = (req, res) => {
  debug('setOpenAngleLimit');

  const { id, angleLimitOpen }  = req.body;
  
  if (!id || !angleLimitOpen) {
    return res.sendStatus(400);
  }
  
  BlindsController.setOpenAngleLimit(id, angleLimitOpen)
  .then((results) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(`BlindsController setOpenAngleLimit Error: ${ err }`);
    res.sendStatus(500);
  })
}

const setClosedAngleLimit = (req, res) => {
  debug('setClosedAngleLimit');

  const { id, angleLimitClosed }  = req.body;
  
  if (!id || !angleLimitClosed) {
    return res.sendStatus(400);
  }
  
  BlindsController.setClosedAngleLimit(id, angleLimitClosed)
  .then((results) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(`BlindsController setClosedAngleLimit Error: ${ err }`);
    res.sendStatus(500);
  })
}

const status = (req, res) => {
  debug('status');

  if (!req.query.id) {
    return res.sendStatus(400);
  }
  BlindsController.status(req.query.id)
  .then((results) => {
    res.status(200).json(results);
  });
}

const peripheralStatus = (req, res) => {
  debug('peripheralStatus');

  BlindsController.peripheralStatus()
  .then((results) => {
    res.sendStatus(200);
  })
  .catch((error) => {
    res.sendStatus(500);
  });
}

module.exports = {
  addBlind,
  closeBlind,
  getBlinds,
  peripheralStatus,
  openBlind,
  removeBlind,
  setClosedAngleLimit,
  setPosition,
  setOpenAngleLimit,
  status,
  updateBlindWithId,
}

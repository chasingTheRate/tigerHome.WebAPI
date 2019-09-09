const express = require('express');
const router = express.Router();
const contactSensorService = require('../service/contactSensorService'); 

router.get('/', contactSensorService.getContactSensors);
router.post('/didChangeState', contactSensorService.didChangeState);

module.exports = router;
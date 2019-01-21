const express = require('express');
const router = express.Router();
const healthCheck = require('../service/healthCheckService'); 

router.get('/', healthCheck.status);

module.exports = router;
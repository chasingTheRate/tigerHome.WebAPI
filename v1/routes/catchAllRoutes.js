const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to the Tiger Home Server. Be Nice!'));

module.exports = router;
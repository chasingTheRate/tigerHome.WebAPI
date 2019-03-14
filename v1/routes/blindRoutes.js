const express = require('express');
const router = express.Router();
const blindService = require('../service/blindService'); 

router.get('/status', blindService.status);
router.get('/currentPosition', blindService.currentPosition);
router.get('/peripheralStatus', blindService.peripheralStatus);
router.get('/', blindService.getBlinds);

router.post('/add', blindService.addBlind);
router.post('/remove', blindService.removeBlind);
router.post('/:blindId/openBlind', blindService.openBlind);
router.post('/:blindId/closeBlind', blindService.closeBlind);
router.post('/setPosition', blindService.setPosition);
router.post('/setOpenAngleLimit', blindService.setOpenAngleLimit);
router.post('/setClosedAngleLimit', blindService.setClosedAngleLimit);

module.exports = router;
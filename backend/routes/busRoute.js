const express = require('express');
const BusController = require('../controllers/busController');
const busController = require('../controllers/busController');
const router = express.Router();
router.post('/create', BusController.createBus);
router.get('/busState/:state',busController.getAllBusesState);
router.get('/busCountry',busController.getAllBusesCountry);
router.get('/', BusController.getAllBuses);
router.get('/:id', BusController.getBusById);
router.put('/:id', BusController.updateBus);
router.delete('/:id', BusController.deleteBus);
module.exports = router;

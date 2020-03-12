var express = require('express');
var router = express.Router();
var inventoryController = require('../controllers/inventory');

router.get('/get-inventory', inventoryController.getInventory);
router.post('/fetch-production-step', inventoryController.getProductionStepMaterials)

module.exports = router;
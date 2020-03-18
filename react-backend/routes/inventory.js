var express = require('express');
var router = express.Router();
var inventoryController = require('../controllers/inventory');
const isAuth = require('../middleware/is-auth').isAuth;


router.get('/get-inventory', isAuth, inventoryController.getInventory); 
router.get('/fetch-in-production', isAuth, inventoryController.getInProduction)
router.post('/fetch-production-step', isAuth, inventoryController.getProductionStepMaterials)
router.post('/update-ready-ship', isAuth, inventoryController.postUpdateReadyShip)

module.exports = router;
var express = require('express');
var router = express.Router();
var endOfDayController = require('../controllers/endOfDay');
const isAuth = require('../middleware/is-auth').isAuth;

router.post('/update-grills',  endOfDayController.postUpdateGrills);
router.post('/update-feet',  endOfDayController.postUpdateFeet);
router.post('/update-skins', endOfDayController.postUpdateSkins);
router.post('/update-materials',  endOfDayController.postUpdateMaterials);
router.post('/update-vinyl',  endOfDayController.postUpdateVinyl);
router.post('/rollback-All',  endOfDayController.postRollbackAll);

module.exports = router;
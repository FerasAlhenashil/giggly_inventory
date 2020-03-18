var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth').isAuth;

router.get('/get-users', isAuth, adminController.getUsers);
router.post('/add-user', isAuth, adminController.postAddUser);
router.post('/add-product', isAuth, adminController.postAddProduct);
router.post('/delete-user', isAuth, adminController.postDeleteUser);
router.post('/discontinue-product', isAuth, adminController.postDiscontinueProduct);


module.exports = router;
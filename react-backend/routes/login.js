const express = require('express');
const authController = require('../controllers/authController');
const isAuth = require('../middleware/is-auth')
const router = express.Router();

router.get('/get-login', authController.getLogin);
router.get('/get-signup', authController.getSignup);
router.post('/post-login',  authController.postLogin);
router.post('/post-signup', authController.postSignup);
router.get('/get-logout',   authController.postLogout);
router.get('/checkToken', function(req, res) {
    res.sendStatus(200);
});

module.exports = router;

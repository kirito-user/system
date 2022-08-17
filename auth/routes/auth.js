var express = require('express');
var router = express.Router();
const authController =  require("../project/AuthController")

/* GET home page. */
router.post('', authController.islogin);
router.post('/islogin', authController.islogin)

module.exports = router;
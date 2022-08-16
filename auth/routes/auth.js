var express = require('express');
var router = express.Router();
const authController =  require("./../porject/AuthController")

/* GET home page. */
router.post('', authController.islogin);

module.exports = router;
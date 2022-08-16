const express = require('express')
let router = express.Router();

const userController = require('./../User/UserController')

router.post("/login", userController.login)


router.post("/islogin", userController.islogin)


module.exports = router
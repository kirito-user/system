const express = require('express')
let router = express.Router();

const userController = require('./../User/UserController')

router.post("/login", userController.login)


module.exports = router
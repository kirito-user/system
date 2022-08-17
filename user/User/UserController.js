const userService = require('./UserService')

class UserController {
    async login(req, res) {
        const {number, password} = req.body
        const result = await userService.login(number, password)

        console.log(result);

        return res.json({token: result})
    
    }
}

module.exports = new UserController()
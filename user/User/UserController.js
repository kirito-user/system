const userService = require('./UserService')

class UserController {
    async login(req, res) {
        const {number, password} = req.body
        const result = await userService.login(number, password)

        console.log(result);

        return res.json({token: result})
    
    }


    async islogin(req, res) {
        const { token } = req.body
        await userService.islogin(token);

    }
}

module.exports = new UserController()
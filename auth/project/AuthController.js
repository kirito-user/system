const userService = require('./AuthService')

class AuthController {

    async islogin(req, res) {
        const { token } = req.body
        const result = await userService.islogin(token);

        return res.json(result)

    }
}

module.exports = new AuthController()
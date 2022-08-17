const userService = require('./AuthService')

class AuthController {

    async islogin(req, res) {
        const { token } = req.body
        
        const result = await userService.islogin(token);

        return res.json(result)

    }

    async setTokenTime(req, res){
        // 去除添加的前缀
        const token =  req.headers.authorization.slice(7)
        // token处理
        const result = await userService.setTokenTime(token)

        return res.json(result);
    }
}

module.exports = new AuthController()
const userService = require('./UserService')


class UserController {
    async login(req, res) {
        const {number, password} = req.body
        const result = await userService.login(number, password)


        return res.json({token: result})
    
    }

    async register(req, res){
        const {name, password, number} = req.body
        const result = await userService.register(name, password, number)
        
        return res.json(result)
    }

    async verification(req, res) {
        const result = await userService.verification()
        res.type = 'svg'
        return res.json(result)
    }

    async update(req, res){
        const { id } = req.param

        const result = await userService.update(req.body, id)

        return res.json(result)
    }

    async delete(req, res){
        const { id:user_id } = req.param
        const token = req.headers.authorization.slice(7)

        const result = await userService.delete({user_id, id: token.user_id})

        return res.json(result)

    }

    async queryUserAndRole(req, res) {
        const token = req.headers.authorization.slice(7);
        const result = await userService.queryUserAndRole(token)
        return res.json(result)
    }

}

module.exports = new UserController()
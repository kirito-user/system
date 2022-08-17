const userDao = require('./UserDao')
const jwt = require('jsonwebtoken')
const jwtkey = 'kbbkbkjbkkbkbkbkbkb'
class UserService {
    async login(number, password) {
        const user = (await userDao.queryByCondition({number: number}))[0]
        if(!user) {
            return ''
        }
        if(user.password !== password) {
            return ''
        }
        let result = jwt.sign(
            {
                username: user.name,
                user_id: user.id
            },
            jwtkey,
            {expiresIn: '1h'},
        )
        return result
    }
}

module.exports = new UserService()
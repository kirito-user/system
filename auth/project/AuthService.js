const jwt = require('jsonwebtoken')
const jwtkey = 'kbbkbkjbkkbkbkbkbkb'
class AuthService {
    async islogin(token) {
        const data = jwt.verify(token, jwtkey)
        if(data) {
            return {
                code: 200,
                msg: 'success'
            }
        }else {
            return {
                code: '403',
                msg: "failed"
            }
        }
    }

    async setTokenTime(token){
        jwt.
    }
}

module.exports = new AuthService();
const jwt = require('jsonwebtoken')
const jwtkey = 'kbbkbkjbkkbkbkbkbkb'
class AuthService {
    async islogin(token) {
        // 判断是否登陆
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

    /**
     * 
     * @param {String} token 
     * @returns 
     */
    async setTokenTime(token){
        // 判断是否能解析出token
        const token_content = jwt.verify(token, jwtkey)
        if(!token_content) {
            return {
                code: '400',
                msg: 'this token is invalid'
            }
        }
        const time = parseInt((new Date().getDate()) / 1000)
        // 检查token是否到期
        if(token_content.exp - time < 0) {
            return {
                code: '400',
                msg: 'this token is invalid'
            }
        // 在token的设定范围内 生成新的token返回
        } else if (token_content.exp - time > 0 && token_content.exp - time < 10 * 60) {
            const new_token = jwt.sign(
                {
                    username: token_content.name,
                    user_id: token_content.id
                },
                jwtkey,
                {expiresIn: '1h'},
                )

            return {
                code: '200',
                msg: 'this is new token',
                data: new_token
            }
        } else {
            return {
                code: '201',
                msg: 'this token is valid',
            }
        }
    }
}

module.exports = new AuthService();
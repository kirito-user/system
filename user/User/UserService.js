const userDao = require('./UserDao')
const jwt = require('jsonwebtoken')
const util = require('../util/commom.js')

const svgCaptcha = require('svg-captcha')
const { isEmptyV2 } = require('../util/commom.js')
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

    /**
     * 
     * @param {String} name 
     * @param {String} number 
     * @param {Number} password 
     * @returns 
     */


    async register(name, number, password){
        const user = (await userDao.queryByCondition({number: number}))[0]
        if(!user) {
            return {
                code: 400,
                msg: 'account already occupied'
            }
        }

        await userDao.insertOne({name: name, number: number, password})

        return {
            code: 200,
            msg: 'register success'
        }
    }

    async verification() {
        let option = {
            size: 4, // 4个字母
            noise: 2, // 干扰线2条
            color: true, // 文字颜色
            background: "#666", // 背景颜色
        }

        const  captcha = svgCaptcha.create(option)

        const { text, data } = captcha

        return {
            code: 200,
            msg: 'success',
            data: {
                txt: text,
                img: data
            }
        }
    }
    /**
     * 修改信息
     * @param {JSON} param 
     * @param {Object} condition 
     * @returns 
     */
    async update(param, condition){
        try {
            const { password } = param;
            if(isEmptyV2(password)){
                return {
                    code: 400,
                    msg: 'password is empty'
                }
            }

            await userDao.update(param, condition)

            return {
                code: 200,
                msg: 'success'
            }
        } catch (error) {
            return {
                code: 400,
                msg: 'failed',
                data: error
            }
        }
    }

    /**
     * 删除某人
     * @param {Object} param 
     * @returns 
     */
    async delete(param) {
        const update_content = {
            is_delete: 1,
            updated_by: param.user_id
        }
        const condition = {
            id: param.id
        }

        const user = await userDao.queryByCondition(condition)

        if(!user){
            return {
                code: 400,
                msg: 'can not find a people'
            }
        }

        try {
            await userDao.delete(param, condition)
            return {
                code: 200,
                msg: 'success'
            }
        } catch (error) {
            return {
                code: 200,
                msg: 'fialed'
            }
        }
    }



}

module.exports = new UserService()
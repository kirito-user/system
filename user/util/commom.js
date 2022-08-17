const jtw = require('jsonwebtoken')

const config = require('./config.json')

class UTILS {

    /**
     * 不完全判断空
     * @param {*} param 
     * @returns 
     */
    isEmpty(param){
        if(param === null || param === undefined) {
            return true
        } else {
            return false
        }
    }

    isEmptyV2(param) {
        if(param === null || param === undefined) {
            return true
        } else if (typeof param === 'string' && param.length === 0){
            return true
        } else if (typeof param === 'object' && param.length === 0) {
            return true
        } else{
            return false
        }
    }


    vertion(param) {
        if(this.isEmptyV2(param)) {
            throw '无效的参数'
        }

        const data = jtw.verify(param, config.jwtkey)

        return data
    }
}

module.exports =  new UTILS()
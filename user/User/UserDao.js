const knex = require('./../util/knex')
const TABLE = 'user'


class UserDao {

    queryByCondition(condition) {

        return new Promise((resolve, reject) => {
            knex(TABLE).select().where(condition).then(data => {
                resolve(data)
            }).then(err => {
                reject(err)
            })
        })
    }


    async insertOne(param) {
        return new Promise((resolve, reject) => {
            knex(TABLE).insertOne(param).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    async update(param, condition){
        return new Promise((resolve, reject) => {
            knex.transaction(trx => {
                knex(TABLE).update(param).where(condition).transacting(trx).then(trx.commit).catch(trx.rollback)
            }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    async delete(param, condition) {
        return new Promise((resolve, reject) => {
            knex.transaction(trx => {
                knex(TABLE).update({is_deleted: 1, updated_by: param.user_id}).where(condition).then(trx.commit).catch(trx.rollback)
            }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    
}

module.exports = new UserDao()
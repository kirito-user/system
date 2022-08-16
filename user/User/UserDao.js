const knex = require('./../util/knex')
const TABLE = 'user'
class UserDao {

    queryByCondition(condition) {
        let q = new Promise((resolve, reject) => {
            knex(TABLE).select().where(condition).then(data => {
                resolve(data)
            }).then(err => {
                reject(err)
            })
        })

        return q
    }
}

module.exports = new UserDao()
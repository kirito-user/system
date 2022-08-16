const config = require("./config.json")
const knex = require("knex")

const database = knex({
    client: 'mysql',
    connection: config.mysql
})
module.exports = database
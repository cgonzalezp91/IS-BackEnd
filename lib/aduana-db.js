const sql = require('mssql')
const { sqlconfig, aduanadb } = require('../config')
const debug = require('debug')('app:mssql')

const config = sqlconfig //.database = aduanadb.database
config.database = aduanadb.databas

const poolPromiseAduana = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

// class AduanaDB {
//     constructor() {
//         this.poolAduana = new sql.ConnectionPool(config)
//     }

//     connect() {
//         return new Promise((resolve, reject) => {
//             this.poolAduana.connect(error => {
//                 if (error) {
//                     reject(error)
//                 }
//                 debug('Connected to MSSQL')
//                 resolve(this.poolAduana)

//             })
//         })        
//     }
//     getAll( query) => {
//         return this.connect().then()

//     }
// }

module.exports = {
    sql, poolPromiseAduana
}


const passport = require("passport")
const { BasicStrategy } = require("passport-http")
// const { poolPromiseAduana } = require('../../../lib/aduana-db')
const boom = require('boom')

passport.use(
    new BasicStrategy(async function (username, passport, cb) {
        try {
            const pool = await poolPromiseAduana
            const result = await pool.request()
                .input('username', sql.Int, req.query.input_parameter)
                .query(`select * from smimaster.dbo.users where username = @username`)

            if (!result.recordset) {
                return cb(boom.unauthorized(), false)
            }
            const [user] = result.recordset
            // const token = jwt.sing({})

            return cb(null, user)
        } catch (err) {
            return cb(err)
        }
    })
)
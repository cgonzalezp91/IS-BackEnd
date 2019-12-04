const express = require('express')
// const passport = require('passport')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { poolPromiseAduana, sql } = require('../lib/aduana-db')
const { config, decript } = require('../config')
const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES } = require('../utils/time')

router.post('/login', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES)
    try {
        // console.log(req)
        const { username, password } = req.body
        if (!username || !password) {
            return next(boom.unauthorized())
        }
        const pool = await poolPromiseAduana
        const result = await pool.request()
            .input('username', sql.VarChar(50), username)
            .query(`select * from smimaster.dbo.users where username = @username`)
        if (!result.recordset.length > 0) {
            return res.status(404).send('Acceso no autorizado, favor de verificar credenciales')
            // return next(boom.unauthorized('invalid password'))
        }
        const records = result.recordset[0]
        const dbusername = records.Username, dbusernm = records.UserNM
        const guid = records.UserGuid.toLowerCase() ///.replace(/[^a-zA-Z0-9]/g, "")
        const dbpass = records.Password
        const compare = decript(password + guid)
        if (compare.toUpperCase() === dbpass) {
            const token = jwt.sign({ sub: dbusername, dbusernm }, config.authJwtSecret, { expiresIn: "60m" })
            res.json({ access_token: token, uid: records.UserId, profile: records.userprofile, level: records.UserLevel, usernm: dbusernm })
        } else {
            next(boom.unauthorized(), false)
        }

        // const token = jwt.sing({})

        //res.json(result.recordset)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

// router.post('/login', async function (req, res, next) {
//     passport.authenticate("basic", function (error, user) {
//         try {
//             if (error || !user) {
//                 next(boom.unauthorized())
//             }
//             req.login(user, { session: false }, async function (error) {
//                 if (error)
//                     next(error)
//                 const payload = { sub: user.username, email: user.email }
//                 const token = jwt.sign(payload, config.authJwtSecret, { expiresIn: '15m' })

//                 return res.status(200).json({ access_token: token })
//             })
//         } catch (error) {
//             next(error)
//         }
//     })(req, res, next)

// })

module.exports = router
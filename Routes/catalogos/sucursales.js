'use strict'
const express = require('express')
const boom = require('boom')
const router = express.Router()
const { poolPromiseAduana, sql } = require('../../lib/aduana-db')
const cacheResponse = require('../../utils/cacheResponse')
const { FIVE_MINUTES, SIXTY_MINUTES } = require('../../utils/time')

router.get('/sucursales', async (req, res, next) => {
    cacheResponse(res, SIXTY_MINUTES)
    try {
        // console.log(req)
        const pool = await poolPromiseAduana
        const result = await pool.request()
            .query(`select Nombre + ' - ' + Ciudad Sucursal, PREF FROM Aduana.dbo.tblComp`)
        if (!result.recordset.length > 0) {
            var error = new Error('Unexpected error');
            return next(Boom.boomify(error, { statusCode: 400 }))

            // return next(boom.unauthorized('invalid password'))
        }
        const records = result.recordset
        res.json(records)

    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router
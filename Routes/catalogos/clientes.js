'use strict'
const express = require('express')
const boom = require('boom')
const router = express.Router()
const { poolPromiseAduana, sql } = require('../../lib/aduana-db')
const cacheResponse = require('../../utils/cacheResponse')
const { THIRTY_MINUTES, SIXTY_MINUTES } = require('../../utils/time')

router.get('/clientes', async (req, res, next) => {
    cacheResponse(res, THIRTY_MINUTES)
    try {
        // console.log(req)
        const pool = await poolPromiseAduana
        const result = await pool.request()
            .query(`select Cliente_id, Nom, NUMERO FROM Aduana.dbo.Clientes WHERE cancelado=0 ORDER BY Nom`)
        if (!result.recordset.length > 0) {
            var error = new Error('Unexpected error');
            return next(Boom.boomify(error, { status: 400 }))

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
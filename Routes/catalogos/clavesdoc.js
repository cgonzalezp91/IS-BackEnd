'use strict'
const express = require('express')
const boom = require('boom')
const router = express.Router()
const { poolPromiseAduana, sql } = require('../../lib/aduana-db')
const cacheResponse = require('../../utils/cacheResponse')
const { SIXTY_MINUTES } = require('../../utils/time')

router.get('/clavesdoc', async (req, res, next) => {
    cacheResponse(res, SIXTY_MINUTES)
    try {
        // console.log(req)
        const pool = await poolPromiseAduana
        const result = await pool.request()
            .query(`SELECT ClavePedimento + ' - ' + Descripcion txt, ClavePedimento id  
            FROM Aduana.dbo.CAT_CLAVESPED 
            WHERE enuso=1 and ImpExp={0} ORDER BY ClavePedimento`)
        if (!result.recordset.length > 0) {
            var error = new Error('Unexpected error');
            return next(Boom.boomify(error, { statusCode: 400 }))
        }
        const records = result.recordset
        res.json(records)

    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

module.exports = router
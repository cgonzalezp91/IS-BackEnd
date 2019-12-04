'use strict'
const express = require('express')
const boom = require('boom')
const router = express.Router()
const { poolPromiseAduana, sql } = require('../../lib/aduana-db')
const cacheResponse = require('../../utils/cacheResponse')
const { SIXTY_MINUTES } = require('../../utils/time')

router.post('/categorias', async (req, res, next) => {
    // cacheResponse(res, SIXTY_MINUTES)
    try {
        const { impoexpo, pref } = req.body
        if (!impoexpo || !pref) {
            return next(boom.badRequest('Es necesario seleccionar el tipo de operacion y la sucursal'))
        }
        const pool = await poolPromiseAduana
        const result = await pool.request()
            .input('impoexpo', sql.VarChar(50), impoexpo)
            .input('pref', sql.VarChar(50), pref)
            .query(`SELECT categoria, categoria_id 
            FROM Aduana.dbo.CATEGORIAS 
            WHERE cancelado=0 and impoexpo=@impoexpo and pref=@pref order by CATEGORIA`)
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
const express = require('express')
const api = express.Router()

api.get('/test', function (req, res) {
    res.statusCode = 200
    res.json('This si working')
})
module.exports = api;
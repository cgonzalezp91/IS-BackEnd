const { config } = require('../../config')
const boom = require('boom')
const isRequiestAjazOrApi = require('../isRequiestAjazOrApi')

function withErrorStack(err, stack) {
    if (config.dev) {
        return { ...err, stack }
    }
}

function logErrors(err, req, res, next) {
    console.log(err.stack)
    next(err)
}
function wrapError(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err))
    }
    next(err)
}
function notFound(err, req, res, next) {
    if (err.message.match(/not found/)) {
        return res.status(404).send({ error: err.message });
    }
    res.status(500).send({ error: err.message });
}
function clientErrorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err
    // Catch error form Ajax
    if (isRequiestAjazOrApi(req) || res.headersSent) {
        res.status(statusCode).json(whitErrorStack(payload, err.stack))
    } else {
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err

    res.status(statusCode)
    res.render("error", withErrorStack(payload, err.stack))
}
module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler,
    notFound,
    wrapError
}
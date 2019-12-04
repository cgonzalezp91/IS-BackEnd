function isRequiestAjazOrApi(req) {
    return !req.accepts('html') || req.xhr
}

module.exports = isRequiestAjazOrApi
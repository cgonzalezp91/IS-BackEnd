require('dotenv').config()
const crypto = require('crypto');

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT,
    sslport: process.env.SSLPORT,
    authJwtSecret: process.env.AUTH_JWT_SECRET
    sslauth: process.env.SSLAUTH
}

const sqlconfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST
}

const aduanadb = {
    database: process.env.DB_NAME_ADUANA
}
const smimasterdb = {

}


const decript = function (str) {
    // var str = 'carlos8b1a3b2e-df84-4a59-bc01-8e62834f4967'
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
        var code = str.charCodeAt(i);

        bytes = bytes.concat([code]);
    }
    let shasum = crypto.createHash('sha1');
    shasum.update(Int8Array.from(bytes));
    return shasum.digest('hex')


}

module.exports = { config, decript, sqlconfig, aduanadb }
"use strict";
const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express')
const debug = require("debug")("rest-sip:index");
const bodyParser = require("body-parser");
const cors = require("cors");
const { config } = require('./config')
const { logErrors, wrapError, errorHandler, clientErrorHandler, notFound } = require("./utils/middlewares/errorHandlers")
const jwt = require('express-jwt')
//Routes
const app = express()
const login = require('./Routes/login')
// const routePath = "./routers/";
const test = require("./Routes/test")
const aduanas = require('./Routes/catalogos/aduanas')
const categorias = require('./Routes/catalogos/categorias')
const clavesdoc = require('./Routes/catalogos/clavesdoc')
const clientes = require('./Routes/catalogos/clientes')
const patentes = require('./Routes/catalogos/patentes')
const proveedores = require('./Routes/catalogos/proveedores')
const sucursales = require('./Routes/catalogos/sucursales')
const tipoembarque = require('./Routes/catalogos/tipoembarque')
//Routes END
const corsOptions = {
    origin: ['http://localhost:8080', 'http://www.grupoproeci.com.mx', 'http://traficoproeci.grupoproeci.com.mx', 'https://traficoproeci.grupoproeci.com.mx'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//Middelwares
app.use(bodyParser.json())
app.use(cors(corsOptions))

app.get('/', function (req, res) {
    res.statusCode = 200
    res.json('This si working')
})
app.use(jwt({ secret: config.authJwtSecret }).unless({ path: ['/login'] }));
//Routes
app.use("/", login)
app.use("/catalogos", aduanas)
app.use("/catalogos", categorias)
app.use("/catalogos", clavesdoc)
app.use("/catalogos", clientes)
app.use("/catalogos", patentes)
app.use("/catalogos", proveedores)
app.use("/catalogos", sucursales)
app.use("/catalogos", tipoembarque)
//Revisar
// fs.readdirSync(routePath).forEach(function (file) {
//     var route = routePath + file;
//     require(route)(app);
// });
// app.use("/test", test)

//error Handlers
app.use(logErrors)
app.use(wrapError)
app.use(notFound)
app.use(clientErrorHandler)
app.use(errorHandler)



//http.createServer(app).listen(5000);
if (!config.dev) {
    const sslOptions = {
        key: fs.readFileSync('_.grupoproeci.com.mx_private_key.key'),
        cert: fs.readFileSync('grupoproeci.com.mx_ssl_certificate.cer'),
        passphrase: config.sslauth
    };
    https.createServer(sslOptions, app).listen(config.sslport);
}
// const server = app.listen(5000, function () {
const server = app.listen(config.port, function () {
    console.log(`Listening http://localhost:${server.address().port}`)
})

// https.createServer(sslOptions, server).listen(8443)
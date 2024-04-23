const https = require('https')
const http = require('http')
const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express();
const router = require('./routers.js');
const config = require('../config.js');

const privateKey = fs.readFileSync(config.key_path);
const certificate = fs.readFileSync(config.cert_path);
const credentials = {
    key: privateKey,
    cert : certificate
};

app.use(cors());

// Filtre
app.use((req, res, next) => {
    if(!req.socket.encrypted)
    {
        console.log('HTTP connexion incoming.\nRedirecting...');
        res.redirect('https://' + req.hostname + req.url);
    }
    else
        console.log('HTTPS connexion incoming.');

    next();
});


// App
app.use(router);

// Ouverture des serveurs
const httpsServer = https.createServer(credentials, app).listen(config.https_port, () => {
    console.log('HTTPS server running on port ' + config.https_port + '.');
});
const httpServer = http.createServer(app).listen(config.http_port, () => {
    console.log('HTTP server running on port ' + config.http_port + '.');
});
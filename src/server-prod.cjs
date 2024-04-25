const https = require('https')
const http = require('http')
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path');

const app = express();
const router = require('./backend/routers.cjs');
const config = require('./config.cjs');

app.use(cors());

app.use(
    express.static(
        path.resolve(
            __dirname,
            'dist/client'), 
        { index: false }
));

// Redirection HTTPS
app.use((req, res, next) => {
    if(!req.socket.encrypted)
    {
        console.log('HTTP connexion incoming.\nRedirecting...');
        res.redirect('https://' + req.hostname + req.url);
        return;
    }
    else
        console.log('HTTPS connexion incoming.');

    next();
});

app.use('*', async (_, res) => {
    try {
        const template = fs.readFileSync('dist/client/index.html', 'utf-8');
        const { render } = await import('dist/server/server-entry.js');

        const html = template.replace('<!--outlet-->', render);
        res.status(200).set({'Content-Type': 'text/html'}).send(html);
        return;
    } catch (error) {
        res.status(500).send(error);
        return;
    }
});

// App
app.use(router);

// Ouverture des serveurs
const privateKey = fs.readFileSync(config.key_path);
const certificate = fs.readFileSync(config.cert_path);
const credentials = {
    key: privateKey,
    cert : certificate
};

const httpsServer = https.createServer(credentials, app).listen(config.https_port, () => {
    console.log('HTTPS server running on port ' + config.https_port + '.');
});
const httpServer = http.createServer(app).listen(config.http_port, () => {
    console.log('HTTP server running on port ' + config.http_port + '.');
});
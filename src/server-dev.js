import https from 'https'
import http from 'http'
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import { createServer } from 'vite';

const app = express();
import router from './backend/routers.cjs'
import config from './config.cjs'

app.use(cors());

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

// Vite
const vite_server = await createServer({
    server: {
        middlewareMode: true
    },
    appType: 'custom'
});

app.use(vite_server.middlewares);

app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
        const template = await vite_server.transformIndexHtml(url, fs.readFileSync('index.html', 'utf-8'));
        const { render } = await vite_server.ssrLoadModule('frontend/server-entry.jsx');

        const html = template.replace(`<!--outlet-->`, render);
        res.status(200).set({'Content-Type': 'text/html'}).send(html);
        return;
    } catch (error) {
        console.error(error);
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
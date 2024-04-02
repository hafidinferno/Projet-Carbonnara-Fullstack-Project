// Ce fichier correspond à ce qui se trouve sur le serveur, en plus light.
// Il devrait être mis dans le .gitignore
// Je l'ai créé pour que tu ai un serveur node fonctionnel même après le changement apporté.

const express = require('express');
const http = require('http');
const port = 3000;

const app = express();

// filtre
app.use((req, res, next) => {
        if(!req.socket.encrypted) // http
        {
            console.log('Connexion HTTP entrante');
        } 

        next();
});

require('./index.js')(app);

http.createServer(app).listen(port, () => {
        console.log('HTTP Server listening on port ' + port);
});

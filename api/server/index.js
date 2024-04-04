const router = require('./routers')

module.exports = (app) => {
    // Devrait probablement faire un appel à routers    
    app.get('/', (req, res) => {
        //TODO : envoyer l'utilisateur sur la page html principale
        res.send("Hello world");
    })

    app.use('/', router);
}
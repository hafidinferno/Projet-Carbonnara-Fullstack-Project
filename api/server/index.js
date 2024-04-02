const express = require('express') // je suppose que cette include pourrait être supprimé puisqu'il sera dans le server.js
const bodyParser = require('body-parser')

const router = require('./routers')
const db = require('./queries')
const cors = require("cors");

module.exports = (app) => {
    // Devrait probablement faire un appel à routers    
    app.get('/', (req, res) => {
        //TODO : envoyer l'utilisateur sur la page html principale
        res.send("Hello world");
    })
    
    app.get('/test', db.getTest)
    
    app.get('/carbone', db.getCarbonne)
    
    app.get('/delete', cors({ origin: '*' }),db.deleteData);
    
    app.get('/insert', cors({ origin: '*' }),db.insertAll);
    
    app.get('/create', cors({ origin: '*' }),db.createTables);
}


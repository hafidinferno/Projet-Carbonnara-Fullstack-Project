const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const router = require('./routers')
const db = require('./queries')
const cors = require("cors");

app.get('/', (req, res) => {
    //TODO : envoyer l'utilisateur sur la page html principale
    res.send("Hello world");
})

app.get('/test', db.getTest)

app.get('/carbone', db.getCarbonne)

app.get('/delete', cors({ origin: '*' }),db.deleteData);

app.get('/insert', cors({ origin: '*' }),db.insertAll);

app.get('/create', cors({ origin: '*' }),db.createTables);

app.use((req, res, next) => {
	res.status(404).send('Something broke!');
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

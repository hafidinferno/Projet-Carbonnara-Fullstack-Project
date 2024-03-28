const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const router = require('./routers')
const db = require('./queries')

app.get('/', (req, res) => {
    //TODO : envoyer l'utilisateur sur la page html principale
    res.send("Hello world");    
})

app.get('/test', db.getTest)

app.use((req, res, next) => {
	res.status(404).send('Something broke!');
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
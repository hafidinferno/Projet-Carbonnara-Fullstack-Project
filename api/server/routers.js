var express = require('express');
var router = express.Router();
const db = require('./queries');
const cors = require("cors");

//TODO : a enlever
router.get('/test', db.getTest);

//get ecv d'un name(objet) de slug(theme) 
router.get('/carbone/:slug/:name', db.getCarbonne);

//get footprint d'un name(objet) de slug(theme)
router.get('/footprint/:slug/:name', db.getFootPrint);

//effacer les données
router.get('/delete', cors({ origin: '*' }), db.deleteData);

//insérer les données de l'api dans la base de données
router.get('/insert', cors({ origin: '*' }), db.insertAll)

//créer les tables de données
router.get('/create', cors({ origin: '*' }), db.createTables)

module.exports = router;

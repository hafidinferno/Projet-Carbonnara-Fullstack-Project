var express = require('express');
var router = express.Router();
const db = require('./queries')

//TODO : a enlever
router.get('/test', db.getTest);

//get ecv d'un name(objet) de slug(theme) 
router.get('/carbone/:slug/:name', db.getCarbonne);

//get footprint d'un name(objet) de slug(theme)
router.get('/footprint/:slug/:name', db.getFootPrint);

//effacer les données
router.get('/delete', db.deleteData);

//insérer les données de l'api dans la base de données
router.get('/insert',db.insertAll)

//créer les tables de données
router.get('/create',db.createTables)

module.exports = router;

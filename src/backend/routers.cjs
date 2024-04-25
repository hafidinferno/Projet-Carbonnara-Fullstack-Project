var express = require('express');
var router = express.Router();
const db = require('./queries.cjs');
const cors = require("cors");

const origin = '*'

//TODO : a enlever
router.get('/test', db.getTest);

//get ecv d'un name(objet) de slug(theme)
router.get('/carbone/:slug/:name', db.getCarbonne);

//get footprint de slug(theme)
router.get('/footprint/:slug', db.getFootPrint);

router.get('/ecv/boissons', db.getBoissonsEcv);

router.get('/ecv/electromenager', db.getElectromenager);

router.get('/ecv/repas', db.getRepas);

router.get('/ecv/transport', db.getTransport);

router.get('/ecv/chauffage', db.getChauffage);

router.get('/ecv/fruitsetlegumes', db.getFruitsetLegumesEcv);

router.get('/ecv/numerique', db.getNumeriqueEcv);

router.get('/ecv/mobilier', db.getMobilierEcv);

router.get('/ecv/usagenumerique', db.getUsageNumeriqueEcv);

router.get('/ecv/vetements', db.getVetements);

router.get('/ecv/eaux', db.getEaux);

//effacer les données
router.get('/delete', cors({ origin: origin }), db.deleteData);

//insérer les données de l'api dans la base de données
router.get('/insert', cors({ origin: origin}), db.insertAll)

//créer les tables de données
router.get('/create', cors({ origin: origin }), db.createTables)

module.exports = router;
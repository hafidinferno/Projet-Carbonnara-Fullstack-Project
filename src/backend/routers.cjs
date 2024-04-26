var express = require('express');
var router = express.Router();
const db = require('./queries.cjs');
const cors = require("cors");

const origin = '*'

//TODO : a enlever
router.get('/api/test', db.getTest);

//get ecv d'un name(objet) de slug(theme)
router.get('/api/carbone/:slug/:name', db.getCarbonne);

//get footprint de slug(theme)
router.get('/api/footprint/:slug', db.getFootPrint);

router.get('/api/ecv/boissons', db.getBoissonsEcv);

router.post('/api/ecv/electromenager', db.getElectromenager);

router.get('/api/ecv/repas', db.getRepas);

router.get('/api/ecv/transport', db.getTransport);

router.get('/api/ecv/chauffage', db.getChauffage);

router.get('/api/ecv/fruitsetlegumes', db.getFruitsetLegumesEcv);

router.get('/api/ecv/numerique', db.getNumeriqueEcv);

router.get('/api/ecv/mobilier', db.getMobilierEcv);

router.get('/api/ecv/usagenumerique', db.getUsageNumeriqueEcv);

router.get('/api/ecv/vetements', db.getVetements);

router.get('/api/ecv/eaux', db.getEaux);

//effacer les données
router.get('/api/delete', cors({ origin: origin }), db.deleteData);

//insérer les données de l'api dans la base de données
router.get('/api/insert', cors({ origin: origin}), db.insertAll)

//créer les tables de données
router.get('/api/create', cors({ origin: origin }), db.createTables)

module.exports = router;

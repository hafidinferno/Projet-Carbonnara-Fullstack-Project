var express = require('express');
var router = express.Router();
const db = require('./queries.cjs');

//TODO : a enlever
router.get('/api/test', db.getTest);

//get ecv d'un name(objet) de slug(theme)
router.get('/api/carbone/:slug/:name', db.getCarbonne);

//get footprint de slug(theme)
router.get('/api/footprint/:slug', db.getFootPrint);

router.post('/api/ecv/boissons', db.getBoissonsEcv);

router.post('/api/ecv/electromenager', db.getElectromenager);

router.post('/api/ecv/repas', db.getRepas);

router.post('/api/ecv/transport', db.getTransport);

router.post('/api/ecv/chauffage', db.getChauffage);

router.post('/api/ecv/fruitsetlegumes', db.getFruitsetLegumesEcv);

router.post('/api/ecv/numerique', db.getNumeriqueEcv);

router.get('/api/ecv/mobilier', db.getMobilierEcv);

router.post('/api/ecv/usagenumerique', db.getUsageNumeriqueEcv);

router.get('/api/ecv/vetements', db.getVetements);

router.post('/api/ecv/eaux', db.getEaux);

module.exports = router;

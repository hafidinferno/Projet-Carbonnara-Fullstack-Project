var express = require('express');
var router = express.Router();
const db = require('./queries')

router.get('/', db.getTest);
router.get('/', db.deleteData);
router.get('/',db.insertAll)
router.get('/',db.createTables)
module.exports = router;

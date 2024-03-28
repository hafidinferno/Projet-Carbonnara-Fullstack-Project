var express = require('express');
var router = express.Router();
const db = require('./queries')

router.get('/', db.getTest);

module.exports = router;
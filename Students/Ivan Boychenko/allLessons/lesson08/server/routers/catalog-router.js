let express = require('express');
let writer = require('../Utils/writer');

let { load } = require('../controllers/catalog_controller.js');


let router = express.Router();

router.get('/', load);

module.exports = router;

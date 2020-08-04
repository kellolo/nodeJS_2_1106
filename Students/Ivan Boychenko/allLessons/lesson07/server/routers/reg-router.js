let express = require('express');

let { createAccout, updateAccount } = require('../controllers/reg_controller.js');

let router = express.Router();

router.post('/create', createAccout);
router.post('/update', updateAccount);

module.exports = router;
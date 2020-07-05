let express = require('express');


let { createAccout, login } = require('../controllers/auth_controller.js');


let router = express.Router();

router.post('/create', createAccout); // /auth/create

router.post('/', login); // /auth

module.exports = router;
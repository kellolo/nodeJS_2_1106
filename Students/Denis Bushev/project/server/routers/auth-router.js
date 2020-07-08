let express = require('express');

let { createAccount, login } = require('../controllers/auth_controller.js');


let router = express.Router();

router.post('/create', createAccount); // /auth/create

router.post('/', login); // /auth

module.exports = router;
let express = require('express');

let { login, createAccount } = require('../controllers/auth_controller.js');

let router = express.Router();

router.post('/create', createAccount); // /auth/create

router.post('/', login);

module.exports = router;
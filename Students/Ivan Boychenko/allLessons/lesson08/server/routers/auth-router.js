let express = require('express');


let { login } = require('../controllers/auth_controller.js');


let router = express.Router();

router.post('/', login); // /auth

module.exports = router;
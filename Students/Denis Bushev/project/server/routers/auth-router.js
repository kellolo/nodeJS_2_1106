let express = require('express');

let { createAccount } = require('../controllers/auth_controller.js');


let router = express.Router();

router.post('/create', createAccount); // /auth/create

router.post('/', (req, res) => {
    
}); // /auth

module.exports = router;
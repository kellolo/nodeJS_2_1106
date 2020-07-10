const express = require('express');

const authServices = require('../Services/auth');

const { } = require('../controllers/auth-controller');

const router = express.Router();

router.post('/', load);

router.post('/create', (req, res) => {
    
});

module.exports = router;
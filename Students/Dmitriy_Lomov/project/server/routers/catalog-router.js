const express = require('express');
const fs = require('fs');
const writer = require('../Utils/writer');
const catalogServices = require('../Services/catalog');

const { load } = require('../controllers/catalog_controller.js');


const router = express.Router();

router.get('/', load);

router.post('/', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if (!err) {
            const { newCatalog, idNewItem } = catalogServices.add(JSON.parse(data), req.body);
            writer('./server/db/catalog.json', newCatalog)
                .then(status => {
                    if (status) {
                        res.json({ id: idNewItem });
                    } else {
                        res.sendStatus(500);
                    }
                })
        }
    });
});

module.exports = router;

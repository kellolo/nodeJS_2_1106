const express = require('express');
const fs = require('fs');
const writer = require('../Utils/writer');
const catalogServices = require('../Services/catalog');

const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        }
    })
});

router.post('/', (req, res) => {
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
        if (!err) {
            let { newCatalog, idNewItem } = catalogServices.add(JSON.parse(data), req.body);
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
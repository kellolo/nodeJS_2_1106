const express = require('express');
const fs = require('fs');
const logger = require('../Utils/logger');
const writer = require('../Utils/writer');
const basketServices = require('../Services/basket');


const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            res.send(data);
        }
    })
});

router.post('/', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            const { newBasket } = basketServices.add(JSON.parse(data), req.body);
            writer('./server/db/basket.json', newBasket)
                .then(status => {
                    if (status) {
                        res.json({ status: 1 });
                        logger('add', req.body.product_name);

                    } else {
                        res.sendStatus(500);
                    }
                })
        }
    });
});

router.put('/:id', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            const { newBasket, name } = basketServices.change(JSON.parse(data), req.params.id, req.body.amount);
            writer('./server/db/basket.json', newBasket)
                .then(status => {
                    if (status) {
                        res.json({ status: 1 });
                        logger('change', name);
                    } else {
                        res.sendStatus(500);
                    }
                })
        }
    });
});

router.delete('/:id', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (!err) {
            const { newBasket, name } = basketServices.delete(JSON.parse(data), req.params.id);
            writer('./server/db/basket.json', newBasket)
                .then(status => {
                    if (status) {
                        res.json({ status: 1 });
                        logger('remove', name);
                    } else {
                        res.sendStatus(500);
                    }
                })
        }
    });
});

module.exports = router;

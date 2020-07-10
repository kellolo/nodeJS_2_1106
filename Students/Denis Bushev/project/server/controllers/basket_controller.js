let Basket = require('../db/models/basket');

module.exports = {
    async load(req, res) {
        let basketCollection;
        try {
            basketCollection = await Basket.find({ user_id: req.params.id });

            if (!basketCollection.length) {
                basketCollection.push(await Basket.create({
                    user_id: req.params.id,
                    items: []
                }))
            }
        }
        catch(err) {
            console.log('___BASKETLOAD___' + err);
            res.sendStatus(500);
        }
        finally {
            res.json(basketCollection[0]);
        }
    },
    async add(req, res) {
        try {
            let basketCollection = await Basket.find({ user_id: req.params.id });
            if (basketCollection.length) {
                let basket = basketCollection[0];
                let _items = basket.items;

                _items.push(req.body);

                await basket.updateOne({ items: _items });
                res.json({ status: true });
            }
        }
        catch(err) {
            console.log('___BASKETADD___' + err);
            res.sendStatus(500);
        }
    },
    async change(req, res) {
        try {
            let basketCollection = await Basket.find({ user_id: req.params.id });
            if (basketCollection.length) {
                let basket = basketCollection[0];
                let _items = basket.items;

                let find = _items.find(item => item._id == req.body._id);
                find.amount += req.body.amount;

                await basket.updateOne({ items: _items });
                res.json({ status: true });
            }
        }
        catch(err) {
            console.log('___BASKETCHANGE___' + err);
            res.sendStatus(500);
        }
    },
    async remove(req, res) {
        try {
            let basketCollection = await Basket.find({ user_id: req.params.id });
            if (basketCollection.length) {
                let basket = basketCollection[0];
                let _items = basket.items;

                let find = _items.find((item) => {
                    item._id = req.body._id;
                  });
                _items.splice(_items.indexOf(find), 1);

                await basket.updateOne({ items: _items });
                res.json({ status: true });
            }
        }
        catch(err) {
            console.log('___BASKETREMOVE___' + err);
            res.sendStatus(500);
        }
    }
}
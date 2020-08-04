let Basket = require('../db/models/basket')

module.exports = {
    async load(req, res) {
        res.json(await Basket.find())
    }
}
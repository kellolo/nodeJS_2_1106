let mong = require('mongoose')
let Schema = mong.Schema

let basketSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: false },
    amount: { type: Number, required: true, default: null}
})

module.exports = mong.model('basket_products', basketSchema)
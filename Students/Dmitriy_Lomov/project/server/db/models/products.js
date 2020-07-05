let mong = require('mongoose');
let Schema = mong.Schema;

let prodSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: false },
    amount: { type: Number, required: false, default: null },
    // type:
});

module.exports = mong.model('PRODUCTS', prodSchema);
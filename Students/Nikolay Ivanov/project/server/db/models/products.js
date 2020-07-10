const db = require('mongoose');
const Schema = db.Schema;

let prodSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: false },
    amount: { type: Number, required: false, default: null },
});

module.exports = db.model('PRODUCTS', prodSchema);
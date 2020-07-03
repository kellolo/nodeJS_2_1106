let mong = require('mongoose');
let Schema = mong.Schema;

let basketItemSchema = new Schema({
    id_product: { type: Number, required: true },
    user_id: {type: Number, required: true, default: 1},
    quantity: { type: Number, required: true },
});

module.exports = mong.model('BASKET_ITEM', basketItemSchema);

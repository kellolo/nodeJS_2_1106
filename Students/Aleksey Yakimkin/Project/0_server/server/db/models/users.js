let mong = require('mongoose');
let Schema = mong.Schema;

let userSchema = new Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: false, default: false },
    basket: { type: String, required: false, default: '' }
});

module.exports = mong.model('USERS',userSchema);
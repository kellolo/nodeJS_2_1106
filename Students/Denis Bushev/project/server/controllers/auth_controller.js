let Users = require('../db/models/users.js');

module.exports = {
    async createAccount(req, res) {
        try {
            let { login, password, basket } = req.body;
            let newItem = await Users.create({
                login, password, basket
            });
            res.json({_id: newItem._id})
        }
        catch(err) {
            console.log('___USERCREATE____ ' + err);
            res.json({ status: false });
        }
    }
}
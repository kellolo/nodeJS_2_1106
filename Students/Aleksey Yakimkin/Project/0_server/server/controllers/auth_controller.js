let Users = require('../db/models/users');

module.exports = {
    async login(req, res) {
        try {
            let users = await Users.find({ login: req.body.login, password: req.body.password });
            
            if (users.length) {
                let user = users[0]
                res.json({ _id: user._id, login: user.login, basket: user.basket });
            } else {
                //res.send('USER NOT FOUND. SIGN UP FIRST!');
                res.sendStatus(404);
            }
        }
        catch(err) {
            console.log('__USERLOGIN__ ' + err);
            res.json({ status: false });
        }
    },
    async createAccount(req, res) {
        try {
            let { login, password, basket } = req.body;
            let newItem = await Users.create({
                login, password, basket
            });
            res.json({_id: newItem._id});
        }
        catch(err) {
            console.log('__USERCREATE__ ' + err);
            res.json({ status: false });
        }
    }
}
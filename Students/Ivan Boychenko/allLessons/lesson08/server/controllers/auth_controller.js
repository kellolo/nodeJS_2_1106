let Users = require('../db/models/users.js');

module.exports = {
    async login(req, res) {
        try {
            let users = await Users.find({ login: req.body.login, password: req.body.password });
            if(users.length) {
                let user = users[0];
                res.json({ _id: user._id, login: user.login, basket: user.basket, firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, admin: user.admin });
            } else {
                res.sendStatus(404);
            }
        }
        catch(err) {
            console.log('__USERLOGIN__ ' + err);
            res.json({ result: false });
        }
    },
}
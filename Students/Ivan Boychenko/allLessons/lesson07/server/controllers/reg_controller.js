let Users = require('../db/models/users');

module.exports = {
    async createAccout(req, res) {
        try {
            let { email,login,password, lastName, firstName } = req.body;
            let newItem = await Users.create({
                email,login,password, lastName, firstName
            });
            res.json({ _id: newItem._id, status: true })
        }
        catch(err) {
            console.log('__USERCREATE__ ' + err);
            res.json({ status: false });
        }
    },
    async updateAccount(req, res) {
        try {
            let { login, id, firstName, lastName, email, password } = req.body;
            let newItem = await Users.updateOne({_id: id}, 
                {$set: {login: login, firstName: firstName, lastName: lastName, email: email, password: password}});
            res.json({ _id: newItem._id, status: true })
        }
        catch(err) {
            console.log('UPDATE ' + err);
            res.json({ status: false });
        }
    }
}
let Users = require("../db/models/users");

module.exports = {
  async createAccount(req, res) {
    console.log(`createAcc ${req.body}`);
    try {
      let { login, password, basket } = req.body;
      let newItem = await Users.create({ login, password, basket });
      res.json({ _id: newItem._id });
    } catch (error) {
      console.log(`Error create user: ${error}`);
      res.json({ status: false });
    }
  },
};

let Messages = require("../db/models/messages");

module.exports = {
  async load(req, res) {
    let uMessages = await Messages.find({ user_id: req.params.id });
    res.json(uMessages[0]);
  },
  async send(msg) {
    try {
        let msgArray = await this._find(msg._id, msg.senderId);
        if(msgArray.length){
            msgArray.push(msg);
        } else {
            let userMsgs = await Messages.find({user_id: msg._id});
            let items = userMsgs[0].items;
            items.push(msg);

            await userMsgs[0].updateOne({items})
        }
    } catch (err) {
        console.log('Msg send' + msg.id);
    } finally {
        return ({ status: true, message: msg});
    }
  },
  async receive(req, res) {},
  async _find(id, senderId) {
    try {
      let uMessages = await Messages.find({ user_id: id });
      if (!uMessages.length) {
        uMessages = [];
        uMessages.push(await Messages.create({ user_id: id, items: [] }));
      }
      let reqMsgArray = uMessages[0].items.filter((msg) => {
        msg.senderId == senderId;
      });
      return reqMsgArray;
    } catch (err) {
      console.log("Msg" + id);
    }
  },
};

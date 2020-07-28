let Basket = require("../db/models/basket");

module.exports = {
  async load(req, res) {
    let basketCollection;
    try {
      basketCollection = await Basket.find({ user_id: req.params.id });

      if (!basketCollection.length) {
        basketCollection.push(
          await Basket.create({
            user_id: req.params.id,
            items: [],
          })
        );
      }
    } catch (err) {
      console.log("ERR: " + err);
    } finally {
      res.json(basketCollection[0]);
    }
  },
  async add(req, res) {
    try {
      let basketCollection = await Basket.find({ user_id: req.params.id });
      if (basketCollection.length) {
        let basket = basketCollection[0];
        let items = basket.items;

        items.push(req.body);

        await basket.updateOne({ items: items });
        res.json({ status: true });
      }
    } catch (err) {
      console.log("ERR: " + err);
    }
  },
  async change(req, res) {
    try {
      let basketCollection = await Basket.find({ user_id: req.params.id });

      if (basketCollection.length) {
        let basket = basketCollection[0];
        let items = basket.items;

        let find = items.find((item) => item._id == req.body._id);
        find.amount += req.body.amount;

        await basket.updateOne({ items: items });
        res.json({ status: true });
      }
    } catch (err) {
      console.log("ERR: " + err);
    }
  },
  async remove(req, res) {
    try {
      let basketCollection = await Basket.find({ user_id: req.params.id });
      let basket = basketCollection[0];
      let items = basket.items;
      
      let find = items.find((item) => item._id == req.body._id);
      items.splice(items.indexOf(find), 1);
      
      await basket.updateOne({ items: items});
      res.json({ status: true });
    } catch (err) {
      console.log("ERR: " + err);
    }
  },
};

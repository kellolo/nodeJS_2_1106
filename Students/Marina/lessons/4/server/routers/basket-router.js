let express = require("express");
let fs = require("fs");
let logger = require("../Utils/logger");
let writer = require("../Utils/writer");
let basketServices = require("../Services/basket");

let router = express.Router();

router.get("/", (req, res) => {
  fs.readFile("./server/db/basket.json", "utf-8", (err, data) => {
    if (!err) {
      res.send(data);
    }
  });
});

router.post("/", (req, res) => {
  fs.readFile("./server/db/basket.json", "utf-8", (err, data) => {
    if (!err) {
      let { newBasket } = basketServices.add(JSON.parse(data), req.body);
      writer("./server/db/basket.json", newBasket).then((status) => {
        if (status) {
          res.json({ status: 1 });
          logger("add", req.body.name);
        } else {
          res.sendStatus(500);
        }
      });
    }
  });
});

router.put("/:id", (req, res) => {
  fs.readFile("./server/db/basket.json", "utf-8", (err, data) => {
    if (!err) {
      let { newBasket, name } = basketServices.change(
        JSON.parse(data),
        req.params.id,
        req.body.amount
      );
      writer("./server/db/basket.json", newBasket).then((status) => {
        if (status) {
          res.json({ status: 1 });
          logger("change", name);
        } else {
          res.sendStatus(500);
        }
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  fs.readFile("./server/db/basket.json", "utf-8", (err, data) => {
    if (!err) {
      let { newBasket, name } = basketServices.delete(
        JSON.parse(data),
        req.params.id
      );
      writer("./server/db/basket.json", newBasket).then((status) => {
        if (status) {
          res.json({ status: 1 });
          logger("remove", name);
        } else {
          res.sendStatus(500);
        }
      });
    }
  });
});

module.exports = router;

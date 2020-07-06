let express = require("express");
let { load, add, change, remove } = require("../controllers/basket_controller.js");

let router = express.Router();

router.get("/:id", load);
router.post("/:id", add);
router.put("/:id", change);
router.delete("/:id", remove);

module.exports = router;

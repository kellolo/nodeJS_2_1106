let express = require("express");
let { createAccount } = require("../controllers/auth-controller");

let router = express.Router();
router.get("/", createAccount);

router.post("/", (req, res) => {
});

module.exports = router;

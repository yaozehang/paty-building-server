const {Router} = require("express");
const router = Router();

router.use("/uploadToken", require("./upload"));

module.exports = router;

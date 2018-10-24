const {Router} = require("express");
const router = Router();
const token = require("../config/upload");

router.get("/get", (req, res) => {
    res.json({
        data: token(),
        code: 200,
        msg: 'success'
    })
})

module.exports = router;
const express = require('express');
const router = express.Router();
const categoryModel = require('../model/category')

router.get('/',async(req, res, next) => {
  try {
    let dataList = await categoryModel.find()

    res.json({
      code:200,
      msg:"success",
      data:dataList
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router;
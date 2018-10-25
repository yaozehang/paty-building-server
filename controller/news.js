const express = require('express');
const router = express.Router();
const auth = require('./auth');
const newsModel = require('../model/news')

router.post('/', auth, async(req, res, next) => {
  try {
    let {
      title,
      content,
      contentText,
      img,
      author,
      type,
      look_num
    } = req.body;
    const news = await newsModel.create({
      title,
      content,
      contentText,
      img,
      author,
      type,
      look_num
    })

    res.json({
      code:200,
      msg:'新闻新建成功'
    })
  } catch (err) {
    next(err)
  }
})

router.get('/', async(req, res, next) => {
  try {
    let {page = 1, row = 10} = req.query
    page = parseInt(page)
    row = parseInt(row)

    const dataList = await newsModel
                  .find()
                  .skip((page-1)*row)
                  .limit(row)
                  .sort({_id:-1})
                  .populate({
                    path:'admin_user',
                    select:"-password"
                  })
                  .populate({
                    path:'category',
                  })
    res.json({
      code:200,
      msg:'success',
      data:dataList
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async(req, res, next) => {
  try {
    const {id} = req.params

    const data = await newsModel
                  .findById(id)
                  .sort({_id:-1})
                  .populate({
                    path:'admin_user',
                    select:"-password"
                  })
                  .populate({
                    path:'category',
                  })
    res.json({
      code:200,
      msg:'success',
      data:data
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('./auth')
const topicModel = require('../model/topic')

router.post('/', auth , async(req, res, next) => {
  try {
    const {content} = req.body
    const userId = req.session.user._id
    
    const topic = await topicModel.create({
      user: userId,
      content
    })

    res.json({
      code:200,
      msg:'success',
    })
  } catch (error) {
    next(error)
  }
})

router.get('/', auth, async(req, res, next) => {
  try {
    let {page=1, row=10} = req.query
    page = parseInt(page)
    row = parseInt(row)

    const dataList = await topicModel
                  .find()
                  .skip((page - 1)*row)
                  .limit(row)
                  .sort({_id:-1})
                  .populate({
                    path:'user',
                    select:'username avatar'
                  })
                  .populate({
                    path:'common',
                    select:'content'
                  })
    const total = await topicModel.count()
    res.json({
      code:200,
      msg:'success',
      data:dataList,
      total
    })
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", auth, async (req, res, next) => {
  try {
    let { id } = req.params;

    let data = await topicModel.deleteOne({_id:id});
    res.json({
      code: 200,
      msg: "删除成功"
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
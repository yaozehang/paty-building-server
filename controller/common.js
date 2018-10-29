const express = require("express");
const router = express.Router();
const auth = require("./auth");
const topicModel = require("../model/topic");
const commonModel = require("../model/common");

router.post("/", auth, async (req, res, next) => {
  try {
    const { content, topic_id } = req.body;

    const userId = req.session.user._id;

    let common;
    const topic = await topicModel.findById(topic_id); //查找主题
    if (topic) {
      common = await commonModel.create({
        content,
        user: userId,
        topic: topic_id
      });
      await topic.update({$push:{common:common._id}})
      res.json({
        code:200,
        msg:'success',
        data:common
      })
    } else {
      res.json({
        code:400,
        msg:'没有找到该主题',
      })
    }
  } catch (error) {
    next(error);
  }
});

router.get('/getCommon/:topicId',async(req, res, next) => {
  try {
    let {topicId} = req.params

    const dataList = await commonModel
      .find({topic:topicId})
      .populate({
        path:'user',
        select:'username avatar'
      })
    const total = await commonModel.count()
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

module.exports = router;

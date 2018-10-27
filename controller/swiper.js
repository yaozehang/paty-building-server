const express = require("express");
const router = express.Router();
const auth = require("./auth");
const swiperMoudel = require("../model/swiper");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

router.post("/", auth, async (req, res, next) => {
  try {
    let { title, news, img, sort, status } = req.body;

    let data = await swiperMoudel.create({
      title,
      news,
      img,
      sort,
      status
    });

    res.json({
      code: 200,
      msg: "上传成功"
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", auth, async (req, res, next) => {
  try {
    let { id } = req.params;

    let { title, news, img, sort, status } = req.body;

    let record = await swiperMoudel.findById(id);

    if (record) {
      await record.$set({ title, news:ObjectId(news), img, sort, status });
      await record.save();
      res.json({
        code: 200,
        msg: "修改成功"
      });
    } else {
      res.json({
        code: 400,
        msg: "修改失败"
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let { page = 1, row = 10 } = req.query;
    page = parseInt(page);
    row = parseInt(row);

    let data = await swiperMoudel
      .find()
      .skip((page - 1) * row)
      .limit(row)
      .sort({sort: 1, _id: -1 })
      .populate({
        path: "news"
      });
    let total = await swiperMoudel.count();
    res.json({
      code: 200,
      msg: "success",
      data,
      total
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await swiperMoudel
      .findById(id)
      .populate({
        path: "news"
      });
    res.json({
      code: 200,
      msg: "success",
      data: data
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    let { id } = req.params;

    let data = await swiperMoudel.deleteOne({_id:id});
    res.json({
      code: 200,
      msg: "删除成功"
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;

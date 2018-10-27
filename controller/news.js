const express = require("express");
const router = express.Router();
const auth = require("./auth");
const newsModel = require("../model/news");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

router.post("/", auth, async (req, res, next) => {
  try {
    let { title, content, contentText, img, author, type, look_num } = req.body;
    const news = await newsModel.create({
      title,
      content,
      contentText,
      img,
      author,
      type,
      look_num
    });

    res.json({
      code: 200,
      msg: "新闻新建成功"
    });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let { page = 1, row = 10 } = req.query;
    page = parseInt(page);
    row = parseInt(row);

    const dataList = await newsModel
      .find()
      .skip((page - 1) * row)
      .limit(row)
      .sort({ _id: -1 })
      .populate({
        path: "author",
        select: "-password"
      })
      .populate({
        path: "type",
      })
      const total = await newsModel.count();
    res.json({
      code: 200,
      msg: "success",
      data: dataList,
      total
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await newsModel
      .findById(id)
      .populate({
        path: "author",
        select: "-password"
      })
      .populate({
        path: "type",
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

router.patch("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;

    let { title, content, contentText, img, author, type, look_num } = req.body;

    const record = await newsModel.findById(id)
    if (record) {
      await record.$set({ title, content, contentText, img, author: ObjectId(author), type: ObjectId(type), look_num })
      await record.save()
        res.json({
            code: 200,
            msg: '修改成功'
        })
    } else {
        res.json({
            code: 400,
            msg: '修改失败'
        })
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    let { id } = req.params;

    let data = await newsModel.deleteOne({_id:id});
    res.json({
      code: 200,
      msg: "删除成功"
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;

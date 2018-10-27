const { Router } = require("express");
const router = Router();
const adminUserModel = require("../model/adminUser");
const auth = require("./auth");

router.post("/", auth, async (req, res, next) => {
  //增加管理员
  try {
    let {
      username,
      nickname,
      avatar,
      password,
      desc,
      job,
      phone,
      sex
    } = req.body;

    let data = await adminUserModel.create({
      username,
      nickname,
      avatar,
      password,
      desc,
      job,
      phone,
      sex
    });

    res.json({
      code: 200,
      data,
      msg: "新建管理员用户成功"
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  // 登录模块
  try {
    let { username, password } = req.body;

    if (username && password) {
      const user = await adminUserModel.findOne({ username });
      if (user) {
        //有没有这个用户
        if (password == user.password) {
          req.session.user = user; //将用户的信息存进session内
          res.json({
            code: 200,
            msg: "登录成功"
          });
        } else {
          res.json({
            code: 401,
            msg: "密码错误"
          });
        }
      } else {
        res.json({
          code: 401,
          msg: "该用户不存在"
        });
      }
    } else {
      res.json({
        code: 400,
        msg: "缺少必要参数"
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let { page, row = 10 } = req.query;
    page = parseInt(page);
    row = parseInt(row);

    let dataList = await adminUserModel
      .find()
      .skip((page - 1) * row)
      .limit(row)
      .sort({ _id: -1 })
      .select("-password");

    const total = await adminUserModel.count();

    res.json({
      code: 200,
      data: dataList,
      msg: "success",
      total
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let data = await adminUserModel.findById(id).select("-password");

    res.json({
      code: 200,
      data,
      msg: "success"
    });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;

    let { username, nickname, avatar, desc, job, phone, sex } = req.body;

    const record = await adminUserModel.findById(id);
    if (record) {
      await record.$set({
        username,
        nickname,
        avatar,
        desc,
        job,
        phone,
        sex
      });
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

router.delete("/:id", auth, async (req, res, next) => {
  try {
    let { id } = req.params;

    let data = await adminUserModel.deleteOne({_id:id});
    res.json({
      code: 200,
      msg: "删除成功"
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;

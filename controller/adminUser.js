const {Router} = require('express')
const router = Router()
const adminUserModel = require('../model/adminUser')
const auth = require('./auth')

router.post('/', auth,async(req, res, next) => { //增加管理员
  try{
    let {
      username,
      nickname,
      avatar,
      password,
      desc,
      job,
      phone,
      sex
    } = req.body

    let data = await adminUserModel.create({
      username,
      nickname,
      avatar,
      password,
      desc,
      job,
      phone,
      sex
    })

    res.json({
      code:200,
      data,
      msg:'新建管理员用户成功'
    })
  } catch(err){
     next(err)
  }
})

router.post('/login', async(req, res, next) => { // 登录模块
  try{
    let {username, password} = req.body
    
    if(username&&password){
       const user = await adminUserModel.findOne({username}) 
       if(user) {  //有没有这个用户
         if(password == user.password) {
           req.session.user = user  //将用户的信息存进session内
           res.json({
             code: 200,
             msg: '登录成功'
           })
         } else {
           res.json({
             code: 401,
             msg: '密码错误'
           })
         }
       } else {
         res.json({
           code: 401,
           msg: '该用户不存在'
         })
       }
    } else {
      res.json({
        code: 400,
        msg: '缺少必要参数'
      })
    }
  } catch(err) {
    next(err)
  }
})

module.exports = router;
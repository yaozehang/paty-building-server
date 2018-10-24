module.exports = function( req, res, next){
  if(req.session&&req.session.user){
    next()
  } else {
    res.json({
      code: 401,
      msg: '登录状态失效'
    })
  }
}
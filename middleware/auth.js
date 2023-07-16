module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    // 設定warning_msg
    req.flash('warning_msg', '請先登入才能使用！')  
    res.redirect('/users/login')
  }
}
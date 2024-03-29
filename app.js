// import express and express-handlebars
const express = require('express')
const exphbs = require('express-handlebars')

// 載入cookie - session設定
const session = require('express-session')
// 載入passport設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

 // 引用connect-flash套件
const flash = require('connect-flash')  

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 載入mongoose設定
require('./config/mongoose')

// 載入 method-override
const methodOverride = require('method-override')

// 載入router 引用路由器
const routes = require('./routes/index')

// set port
const port = 3000

// start express
const app = express()

// set static files >> bootstrap改成從main.handlebars直接載入 這裡只載入style.css
app.use(express.static('public'))

// set body parser
app.use(express.urlencoded({extended: true}))

// set up template engine (handlebars and layout)
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    //compare whether two values are equal or not.
    eq: function (value1, value2) {
      return value1 === value2
    }
  }
}))

app.set('view engine', 'handlebars')

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 使用cookie - session設定
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)

 // 掛載connect - flash套件
app.use(flash()) 

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  res.locals.err_msg = req.flash('err_msg')  // 設定 err_msg 訊息
  next()
})

// 將 request 導入路由器
app.use(routes) 

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})


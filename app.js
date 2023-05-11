// import express and express-handlebars
const express = require('express')
const exphbs = require('express-handlebars')

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

// set static files
app.use(express.static('public'))
// set body parser
app.use(express.urlencoded({extended: true}))

// set up template engine (handlebars and layout)
app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes) 

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})


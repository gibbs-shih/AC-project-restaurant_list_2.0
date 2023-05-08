// import express and express-handlebars
const express = require('express')
const exphbs = require('express-handlebars')

// 載入 mongoose
const mongoose = require('mongoose') 
// 載入 Restaurant model
const Restaurant = require('./models/restaurant')

// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
// 取得資料庫連線狀態
const db = mongoose.connection
// 出現異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

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

// render index
app.get('/', (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

// render search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const searchResults = restaurantInfo.filter(restaurant => 
    restaurant.name.toLowerCase().includes(keyword.toLowerCase().trim()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase().trim()))
  // 沒有搜尋結果另外處理
    if (!searchResults.length) {
    res.render('no_index', { keyword })
  } else {
    res.render('index', { restaurantInfo: searchResults, keyword })
  }
})

// render new
app.get('/restaurant/new', (req, res) => {
  res.render('new')
})

app.post('/restaurant/new', (req, res) => {
  const name = req.body.name
  return Restaurant.create({ name })
    .then( () => res.redirect('/'))
    .catch(error => console.log(error))
})

// render show
app.get('/restaurants/:restaurantId', (req, res) => {
  Restaurant.findById(req.params.restaurantId)
  .lean()
  .then(restaurant => res.render('show', { restaurant }))
  .catch(error => console.log(error))
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})


// import express and express-handlebars
const express = require('express')
const exphbs = require('express-handlebars')

// 載入 mongoose
const mongoose = require('mongoose') 

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

// import restaurant source
const restaurantSource = require('./restaurant.json')
const restaurantInfo = restaurantSource.results


// start express
const app = express()

// set static files
app.use(express.static('public'))

// set up template engine (handlebars and layout)
app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// render index
app.get('/', (req, res) => {
  res.render('index', { restaurantInfo })
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

// render show
app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurantDetail = restaurantInfo.find(restaurant => restaurant.id.toString() === req.params.restaurantId)
  res.render('show', { restaurantDetail })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})


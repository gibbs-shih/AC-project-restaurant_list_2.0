// import express and express-handlebars
const express = require('express')
const exphbs = require('express-handlebars')

// 載入mongoose設定
require('./config/mongoose')

// 載入 method-override
const methodOverride = require('method-override')

// 載入router 引用路由器
const routes = require('./routes/index')

// 載入 Restaurant model
const Restaurant = require('./models/restaurant')

// set port
const port = 3000

// start express
const app = express()

// 將 request 導入路由器
app.use(routes)

// set static files
app.use(express.static('public'))
// set body parser
app.use(express.urlencoded({extended: true}))

// set up template engine (handlebars and layout)
app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// render search
app.get('/restaurants/search', (req, res) => {
  const keyword = req.query.keyword
  const keywordClean = keyword.trim().toLowerCase()
  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(
        restaurant => 
          restaurant.name.toLowerCase().includes(keywordClean) || 
          restaurant.category.toLowerCase().includes(keywordClean))
      if (!filterRestaurants.length) {
        res.render('no_index', { keyword })
      } else {
        res.render('index', { restaurants: filterRestaurants, keyword })
      }
    })
    .catch(error => console.log(error))
})
  

// render new
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// create function
app.post('/restaurants', (req, res) => {
  const info = {};
  for (const key in req.body) {
    if (req.body[key].length) {
      info[key] = req.body[key]
    }
  }
  return Restaurant.create( info )
    .then( () => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete function
app.delete('/restaurants/:restaurantId', (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// render show
app.get('/restaurants/:restaurantId', (req, res) => {
  Restaurant.findById(req.params.restaurantId)
  .lean()
  .then(restaurant => res.render('show', { restaurant }))
  .catch(error => console.log(error))
})

// render edit
app.get('/restaurants/:restaurantId/edit', (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:restaurantId', (req, res) => {
  const info = {};
  for (const key in req.body) {
    if (req.body[key].length) {
      info[key] = req.body[key]
    }
  }
  const id = req.params.restaurantId
  return Restaurant.findById(id)
    .then(restaurant => {
      for (const key in info) {
        restaurant[key] = info[key]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})


// import express and express-handlebars
const express = require('express')
const exphbs = require('express-handlebars')

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


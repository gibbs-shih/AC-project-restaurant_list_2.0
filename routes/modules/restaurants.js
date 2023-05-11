// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 載入 Restaurant model
const Restaurant = require('../../models/restaurant')

// render search
router.get('/search', (req, res) => {
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
router.get('/new', (req, res) => {
  res.render('new')
})

// create function
router.post('/', (req, res) => {
  const info = {};
  for (const key in req.body) {
    if (req.body[key].length) {
      info[key] = req.body[key]
    }
  }
  return Restaurant.create(info)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete function
router.delete('/:restaurantId', (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// render show
router.get('/:restaurantId', (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// render edit
router.get('/:restaurantId/edit', (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:restaurantId', (req, res) => {
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


// 匯出路由模組
module.exports = router
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 載入 Restaurant model
const Restaurant = require('../../models/restaurant')

// use switch to decide sort definition
function sortDefinition (sort) {
  switch (sort) {
    case "name_asc":
      return { name: "asc"}
    case "name_desc":
      return { name: "desc"}
    case "category":
      return { category: "asc"}
    case "location":
      return { location: "asc"}
    default:
      return { _id: "asc"}
  }
}
 

// render search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const sort = req.query.sort
  const keywordClean = keyword.trim().toLowerCase()
  const userId = req.user._id
  Restaurant.find({userId})
    .lean()
    .sort(sortDefinition(sort))
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(keywordClean) ||
          restaurant.category.toLowerCase().includes(keywordClean))
      if (!filterRestaurants.length) {
        res.render('no_index', { keyword, sort })
      } else {
        res.render('index', { restaurants: filterRestaurants, keyword, sort })
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
  const info = { userId: req.user._id };

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
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOne({ _id, userId})
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// render show
router.get('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// render edit
router.get('/:restaurantId/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOne({ _id, userId })
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
  const userId = req.user._id
  const _id = req.params.restaurantId
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      for (const key in info) {
        restaurant[key] = info[key]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router
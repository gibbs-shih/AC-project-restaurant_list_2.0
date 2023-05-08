const mongoose = require('mongoose')
// 載入 Restaurant model
const Restaurant = require('../restaurant.js')
const seedInfo = require('/Users/gibbsshih/project_restaurant_list/restaurant.json')
const seedInfoList = seedInfo.results
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

   // 建立種子資料
  seedInfoList.forEach(item => Restaurant.create({
    id: item.id,
    name: item.name,
    name_en: item.name_en,
    category: item.category,
    image: item.image,
    location: item.location,
    phone: item.phone,
    google_map: item.google_map,
    rating: item.rating,
    description: item.description
  }))
  
  console.log('done!')
})


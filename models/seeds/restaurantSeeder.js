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
   Restaurant.create(seedInfoList)
  
  console.log('done!')
})


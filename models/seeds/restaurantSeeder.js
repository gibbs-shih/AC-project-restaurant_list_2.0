// 載入mongoose設定
const db = require('../../config/mongoose')

// 載入 Restaurant model
const Restaurant = require('../restaurant.js')

const seedInfo = require('/Users/gibbsshih/project_restaurant_list/restaurant.json')
const seedInfoList = seedInfo.results

db.once('open', () => {
   // 建立種子資料
   Restaurant.create(seedInfoList)
  
  console.log('done!')
})


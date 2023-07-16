const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 載入mongoose設定
const db = require('../../config/mongoose')

// 載入 Restaurant model
const Restaurant = require('../restaurant.js')
// 載入 user model
const User = require('../user.js')

const restaurantInfo = require('/Users/gibbsshih/project_restaurant_list/restaurant.json')
const restaurantInfoList = restaurantInfo.results

const SEED_USERS = [
  {
    name: 'user1',
    email: "user1@example.com",
    password: '12345678'
  },
  {
    name: 'user2',
    email: "user2@example.com",
    password: '12345678'
  }
]
 
// 建立種子資料及使用者、餐廳關聯
// 用 async 關鍵字表示非同步函式、 await 處理非同步
// try / catch 處理錯誤訊息
db.once('open', async() => {
  try {
    console.log('Generating User and Restaurant Seeders...')
    for (let i = 0; i < SEED_USERS.length; i++) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(SEED_USERS[i].password, salt)
      const user = await User.create({
        name: SEED_USERS[i].name,
        email: SEED_USERS[i].email,
        password: hash
      })
      const restaurants = restaurantInfoList.slice(i * 3, (i + 1) * 3).map(restaurant => ({
        ...restaurant, // 解構賦值
        userId: user._id // 增加新屬性userId
      }))
      await Restaurant.insertMany(restaurants) // 一次加入多筆資料
    }
    console.log('All Seeders Generated!!!')
    process.exit()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})
  

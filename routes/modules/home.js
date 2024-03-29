// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// 定義首頁路由 render index
router.get('/', (req, res) => {
  const userId = req.user._id   // 變數設定
  // 加入查詢條件
  Restaurant.find({ userId }) // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc'}) // 用＿id升冪排序
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})


// 匯出路由模組
module.exports = router
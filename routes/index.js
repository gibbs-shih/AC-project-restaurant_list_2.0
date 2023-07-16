// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 準備引入路由模組
const home = require('./modules/home') // 引入 home 模組程式碼
const restaurants = require('../routes/modules/restaurants') // 引入 restaurants 模組程式碼
const users = require('./modules/users') // 引入 users 模組程式碼

const auth = require('./modules/auth') // 引入 auth 模組程式碼

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/users', users)  // / 將網址結構符合 /users 字串開頭的 request 導向 users 模組 
router.use('/restaurants', authenticator, restaurants) // 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組 加入驗證程序
router.use('/auth', auth) // 將網址結構符合 /auth 字串開頭的 request 導向 auth 模組 
router.use('/', authenticator, home) // 將網址結構符合 / 字串的 request 導向 home 模組 加入驗證程序

// 匯出路由器
module.exports = router
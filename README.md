# 餐廳清單 2.0

此專案設置登入、註冊機制

提供使用者瀏覽餐廳，並可以依條件搜尋餐廳資訊，如:餐廳名稱、類別

使用者亦可新增餐廳資訊、編輯餐廳資訊、刪除餐廳資訊、排序餐廳顯示方式

畫面預覽：

![登入](https://github.com/gibbs-shih/AC-project-restaurant_list_2.0/assets/73210852/92f4ecce-4bd9-4d17-b458-77a3871e3e78)
![註冊](https://github.com/gibbs-shih/AC-project-restaurant_list_2.0/assets/73210852/1f68ac79-8e26-483a-88d8-d5a8c3f1e798)
![提示訊息](https://github.com/gibbs-shih/AC-project-restaurant_list_2.0/assets/73210852/1ae6af32-1eca-40ae-bf8b-df0d8f775b32)
![首頁](https://github.com/gibbs-shih/AC-project-restaurant_list_2.0/assets/73210852/482480d2-2b49-4c1f-8624-8db799c2ea28)
![新增](https://github.com/gibbs-shih/AC-project-restaurant_list_2.0/assets/73210852/691e70a4-9eac-4937-b09f-495e1e4be45b)
![編輯](https://github.com/gibbs-shih/AC-project-restaurant_list_2.0/assets/73210852/932784cf-ce4e-471f-8077-b14413638ab8)
![詳細資訊](https://github.com/gibbs-shih/AC-project-restaurant_list_2.0/assets/73210852/869b2099-d4ed-471b-b8e8-3ece688147d3)
![搜尋](https://github.com/gibbs-shih/AC-project-restaurant_list_2.0/assets/73210852/9ebcca41-9c06-4edb-b845-bc3745631624)


## 功能
- 設置登入、註冊頁面，另可以使用Facebook進行登入

- 顯示登入失敗、註冊失敗、登出成功等相關訊息提示

- 設有密碼加密提升安全性

- 依照登入的使用者顯示該使用者專屬的餐廳清單資訊

- 依照餐廳名稱及餐廳類別搜尋餐廳

- 依照所選條件排序餐廳顯示方式

- 新增餐廳資訊、編輯餐廳資訊、刪除餐廳資訊

- 檢視餐廳詳細資訊，如:類別、地址、電話、評分、圖片及 Google Map

- 點選 Google Map顯示詳細地圖可查看位置詳細資料


## 安裝

### 1.下載

開啟終端機(Terminal) cd 到欲存放專案的本機位置並執行:

`git clone https://github.com/gibbs-shih/AC-project-restaurant_list_2.0.git`

### 2.初始

`npm install`  --> 安裝套件

### 3.新增環境變數

找到.env.example檔案 

輸入自己的敏感資訊

並刪除.example字樣

### 4.種子資料

`npm run seed`  --> 執行種子資料腳本

終端顯示 `Generating User and Restaurant Seeders...`

當終端顯示 `All Seeders Generated!!!` 即啟動完成

### 5.開啟程式

`npm run dev`  --> 執行程式

終端顯示 `Express is listening on http://localhost:3000`、`mongodb connected!` 即啟動完成

請至 http://localhost:3000 開始使用程式


## 使用工具
- Node.js - 執行環境
- Visual Studio Code - 程式碼編輯器
- Express - 應用程式架構
- Express-Handlebars - 模板引擎
- Bootstrap - 開源前端框架
- MongoDB Atlas - 資料庫 
- Mongoose - ODM
- Express-session - cookie-session套件
- Passport - 驗證套件
- Bcryptjs - 加密套件
- Connect-flash - 提示訊息套件
- Dotenv - 環境參數套件
- Git - 版本控制軟體

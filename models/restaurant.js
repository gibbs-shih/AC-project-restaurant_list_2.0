const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  name_en: { 
    type: String,
    default: "待更新餐廳英文名稱",
  },
  category: { 
    type: String,
    required: true, 
  },
  image: { 
    type: String,
    default: "https://www.bhf.org.uk/-/media/images/information-support/heart-matters/heart-matters/aug-2017/nutrition/perfect_forks_620x400_exp0920.jpg?rev=4c0e7b4132fa4508acf55063bba78882&hash=DE5892B1BAF8282515A33714AEF83C97"
  },
  location: { 
    type: String,
    default: "待更新餐廳地址"
  },
  phone: { 
    type: String,
    default: "待更新餐廳電話"
  },
  google_map: { 
    type: String,
    default: "https://www.google.com.tw/maps"
  },
  rating: { 
    type: String,
    required: true,
  },
  description: { 
    type: String,
    default: "待更新餐廳描述"
  },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
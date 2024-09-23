const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const user = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  phone: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  address: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const product = sequelize.define('product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  price: {type: DataTypes.STRING},
  img: {type: DataTypes.STRING},
})

const product_info = sequelize.define('product_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false}
})

const basket = sequelize.define('basket', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

user.hasOne(basket)
basket.belongsTo(user)

basket.hasMany(product)
product.belongsTo(basket)

category.hasMany(product)
product.belongsTo(category)

product.hasOne(product_info)
product_info.belongsTo(product)

module.exports = {
  user,
  basket,
  product,
  product_info,
  category
}
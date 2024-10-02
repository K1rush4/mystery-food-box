const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  phone: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  address: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
  name: {type: DataTypes.STRING, allowNull: false},
  surname: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Product = sequelize.define('product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  price: {type: DataTypes.STRING},
  img: {type: DataTypes.STRING},
})

const Product_info = sequelize.define('product_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false}
})

const Basket = sequelize.define('basket', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Basket_product = sequelize.define('basket_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productCounter: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1}
});

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.belongsToMany(Product, { through: Basket_product });
Product.belongsToMany(Basket, { through: Basket_product });

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasOne(Product_info)
Product_info.belongsTo(Product)

module.exports = {
  User,
  Basket,
  Product,
  Product_info,
  Category,
  Basket_product
}
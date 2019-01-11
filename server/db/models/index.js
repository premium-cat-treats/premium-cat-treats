const User = require('./user')
const Product = require('./product.js')
const Category = require('./category.js')
const Order = require('./order')
const OrderTotal = require('./orderTotal')
const db = require('../db')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Product.belongsToMany(Category, {through: 'product_category'})
Category.belongsToMany(Product, {through: 'product_category'})

Order.belongsTo(User)
User.hasMany(Order)
Product.hasMany(Order)
OrderTotal.hasMany(Order)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Category,
  Product
}

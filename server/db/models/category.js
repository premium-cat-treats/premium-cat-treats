const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Category = db.define('category', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

Category.getWithProducts = async id => {
  const categories = await Category.findById(id, {
    include: [
      {
        model: Product
      }
    ]
  })
  return categories
}

module.exports = Category

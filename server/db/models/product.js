const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  priceCents: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/premium_cat_treats.png'
  }
})

module.exports = Product

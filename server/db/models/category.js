const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = Category

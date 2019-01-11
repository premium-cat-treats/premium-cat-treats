const Sequelize = require('sequelize')
const db = require('../db')

const OrderTotal = db.define('orderTotal', {
  totalCents: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = OrderTotal

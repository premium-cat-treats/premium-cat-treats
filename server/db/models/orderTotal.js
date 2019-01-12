const Sequelize = require('sequelize')
const db = require('../db')
var ta = require('time-ago')

const OrderTotal = db.define('orderTotal', {
  totalCents: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  orderDate: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

OrderTotal.beforeValidate(orderTotal => {
  orderTotal.orderDate = ta.today()
})

module.exports = OrderTotal

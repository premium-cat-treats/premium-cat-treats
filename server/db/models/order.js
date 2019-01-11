const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Created',
    allowNull: false,
    validate: {
      isIn: [['Created', 'Processing', 'Canceled', 'Completed']]
    }
  },
  historicalPriceCents: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantityOrdered: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Order

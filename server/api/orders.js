const router = require('express').Router()
const Order = require('../db/models/order')
// const OrderTotal = require('../db/models/orderTotal')
// const Product = require('../db/models/product')
module.exports = router

const groupOrdersByTotal = usersOrders => {
  const groupedOrders = {}
  usersOrders.forEach(singleOrder => {
    if (!groupedOrders['group' + singleOrder.orderTotal.id]) {
      groupedOrders['group' + singleOrder.orderTotal.id] = [singleOrder]
    } else {
      groupedOrders['group' + singleOrder.orderTotal.id].push(singleOrder)
    }
  })
  return groupedOrders
}

router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{all: true}]
    })
    const userOrders = groupOrdersByTotal(orders)
    res.json(userOrders)
  } catch (error) {
    next(error)
  }
})

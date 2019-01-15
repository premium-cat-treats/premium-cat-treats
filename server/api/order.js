const router = require('express').Router()
const Order = require('../db/models/order')
module.exports = router

router.put('/:orderId', async (req, res, next) => {
  try {
    await Order.update(req.body, {
      where: {id: req.params.orderId}
    })
    const updatedOrder = await Order.findById(req.params.orderId, {
      include: [{all: true}]
    })
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {
      historicalPriceCents,
      quantityOrdered,
      productId,
      userId,
      orderTotalId
    } = req.body
    const orderedItem = await Order.create({
      historicalPriceCents,
      quantityOrdered,
      userId,
      productId,
      orderTotalId
    })
    res.status(201).json(orderedItem)
  } catch (error) {
    next(error)
  }
})

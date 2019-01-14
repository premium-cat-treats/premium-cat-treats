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

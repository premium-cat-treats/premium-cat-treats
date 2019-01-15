const router = require('express').Router()
const OrderTotal = require('../db/models/orderTotal')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {totalCents} = req.body
    const orderedItem = await OrderTotal.create({totalCents})
    res.status(201).json(orderedItem)
  } catch (error) {
    next(error)
  }
})

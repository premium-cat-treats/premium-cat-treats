// const router = require('express').Router()
// const Order = require('../db/models/order')
// const User = require('../db/models/user')
// const Product = require('../db/models/product')
// module.exports = router

// router.get('/:id', async (req, res, next) => {
//   try {
//     const products = await Order.findAll({
//       where: {
//         userid: req.params.id
//       },
//        include: [{model: Product}]
//     })
//     res.send(products)
//   } catch (error) {
//     next(error)
//   }
// })

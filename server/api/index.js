const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/orders', require('./orders'))
router.use('/order', require('./order'))
router.use('/order-total', require('./orderTotal'))

function isAccessGranted(req, res, next) {
  // Here your authorization logic (jwt, OAuth, custom connection logic...)
  if (!isGranted) return res.status(401).end()
  next()
}

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

router.use('*', isAccessGranted)

const router = require('express').Router()
const Product = require('../db/models/product')
const Category = require('../db/models/category')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: [{model: Category}]})
    res.send(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const specificProduct = await Product.findById(req.params.id)
    res.send(specificProduct)
  } catch (error) {
    next(error)
  }
})

//TODO: add logic where you must be an admin
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).send(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    const updatedProduct = await Product.findById(req.params.id)
    res.status(201).send(updatedProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    await product.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

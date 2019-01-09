const router = require('express').Router()
const Category = require('../db/models/category')
const Product = require('../db/models/product')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({include: [{model: Product}]})
    res.send(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/products', async (req, res, next) => {
  try {
    const filteredProducts = await Category.getWithProducts(req.params.id)
    res.send(filteredProducts)
  } catch (error) {
    next(error)
  }
})

//TODO: add logic where you need admin access
router.post('/', async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body)
    res.status(201).send(newCategory)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    const updatedCategory = await Category.findById(req.params.id)
    res.status(201).send(updatedCategory)
  } catch (error) {
    next(error)
  }
})

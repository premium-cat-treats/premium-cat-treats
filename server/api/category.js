const router = require('express').Router()
const Category = require('../db/models/category')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const filteredProducts = await Category.getProducts(req.params.id)
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
    await Category.destroy(req.body, {
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
    const updatedProduct = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(201).send(updatedProduct)
  } catch (error) {
    next(error)
  }
})

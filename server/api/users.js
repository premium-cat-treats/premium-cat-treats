const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'deleted', 'adminAccess', 'createdAt']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const specificUser = await User.findById(req.params.id)
    res.send(specificUser)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    const updatedUser = await User.findById(req.params.id)
    res.status(201).send(updatedUser)
  } catch (error) {
    next(error)
  }
})

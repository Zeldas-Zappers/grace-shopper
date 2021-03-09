const router = require('express').Router()
const {User} = require('../db/models')
const Cart = require('../db/models/cart')
const {ensureAdmin, ensureLogin} = require('./middleware')
module.exports = router

// get all users (only for admin)
router.get('/', ensureAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'phone'],
      // include: [{model: Cart}],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// add ensureAdmin back in

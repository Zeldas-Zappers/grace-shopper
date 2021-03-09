const router = require('express').Router()
const Cart = require('../db/models/cart')
const CartItem = require('../db/models/cartItem')
const User = require('../db/models/user')
const Product = require('../db/models/product')
const ensureLogin = require('./middleware')

//get cart order
router.get('/:cartId', ensureLogin, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        id: req.params.cartId,
      },
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

//update orderStatus for cart order
router.put('/:cartId', ensureLogin, async (req, res, next) => {
  console.log('REQ BODY', req.body)
  try {
    const cart = await Cart.findOne({
      where: {
        id: req.params.cartId,
      },
    })

    const updatedCart = await cart.update({orderStatus: 'Fulfilled'})
    console.log('UPDATED CART', updatedCart)
    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

module.exports = router

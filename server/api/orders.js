const router = require('express').Router()
const Cart = require('../db/models/cart')
const CartItem = require('../db/models/cartItem')
const User = require('../db/models/user')
const Product = require('../db/models/product')

//get cart order
router.get('/:cartId', async (req, res, next) => {
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
router.put('/:cartId', async (req, res, next) => {
  //find user's cart
  try {
    const cart = await Cart.findOne({
      where: {
        id: req.params.cartId,
      },
    })
    cart.orderStatus = 'Fullfilled'
    await Cart.update(cart)
    console.log('CART', cart)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router

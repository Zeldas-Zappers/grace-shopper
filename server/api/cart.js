const router = require('express').Router()
const Cart = require('../db/models/cart')
const CartItem = require('../db/models/cartItem')
const User = require('../db/models/user')
const Product = require('../db/models/product')

// get cart for guest
router.get('/:cartId', async (req, res, next) => {
  try {
    let cart = Cart.findOne({
      where: {
        id: req.params.cartId,
      },
      include: [{model: Product}],
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// get cart for user
router.get('/:userId', async (req, res, next) => {
  try {
    let cart = Cart.findOne({
      where: {
        userId: req.params.userId,
      },
      include: [{model: Product}],
    })
    // if the cart doesn't exist yet, create cart for user
    if (!cart) {
      cart = await Cart.create({
        userId: req.params.guestId,
      })
      cart = await Cart.findOne({
        where: {
          userId: req.params.userId,
        },
        include: [{model: Product}, {model: User}],
      })
    }
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

/*
update (put), create new cart (post), delete
*/

router.put('/:cartId', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId)
    const updated = await cart.update(req.body)
    const updatedCart = await Cart.findOne({
      where: {
        id: req.params.cartId,
      },
      include: [{model: Product}, {model: User}],
    })
    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

//updating quantity in cart
router.put('/:cartId/:cartItemId', async (req, res, next) => {
  try {
    const item = await CartItem.findOne({
      where: {
        productId: req.params.cartItemId,
        cartId: req.params.cartId,
      },
    })
    const updated = await item.update(req.body)
    const updatedItem = await CartItem.findOne({
      where: {
        productId: req.params.cartItemId,
        cartId: req.params.cartId,
      },
    })
    res.json(updatedItem)
  } catch (err) {
    next(err)
  }
})

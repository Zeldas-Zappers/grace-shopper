const router = require('express').Router()
const Cart = require('../db/models/cart')
const CartItem = require('../db/models/cartItem')
const User = require('../db/models/user')
const Product = require('../db/models/product')
const {ensureAdmin, ensureLogin} = require('./middleware')

// get all carts/orders (only for admin)
router.get('/', ensureAdmin, async (req, res, next) => {
  try {
    const allCarts = await Cart.findAll()
    res.json(allCarts)
  } catch (err) {
    next(err)
  }
})

// // get cart for guest
// router.get('/:cartId', async (req, res, next) => {
//   try {
//     let cart = await Cart.findOne({
//       where: {
//         id: req.params.cartId,
//       },
//       include: [{model: Product}],
//     })
//     res.json(cart)
//   } catch (err) {
//     next(err)
//   }
// })

// get cart for user
router.get('/user/:userId', ensureLogin, async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
      },
      include: [{model: Product}],
    })
    if (cart) {
      res.json(cart)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:cartId', ensureLogin, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        id: req.params.cartId,
      },
      include: [{model: CartItem}, {model: Product}],
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// router.put('/:cartId', async (req, res, next) => {
//   try {
//     const cart = await Cart.findByPk(req.params.cartId)
//     const updated = await cart.update(req.body)
//     const updatedCart = await Cart.findOne({
//       where: {
//         id: req.params.cartId,
//       },
//       include: [{model: Product}, {model: User}],
//     })
//     res.json(updatedCart)
//   } catch (err) {
//     next(err)
//   }
// })

//updating quantity in cart
router.put('/:cartId/:productId', async (req, res, next) => {
  try {
    const updated = await CartItem.update(req.body, {
      where: {
        cartId: req.params.cartId,
        productId: req.params.productId,
      },
    })
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

router.post('/item', ensureLogin, async (req, res, next) => {
  try {
    const addedItem = await CartItem.create(req.body)
    res.json(addedItem)
  } catch (err) {
    next(err)
  }
})
module.exports = router

const router = require('express').Router()
const Cart = require('../db/models/cart')
const CartItem = require('../db/models/cartItem')
const User = require('../db/models/user')
const Product = require('../db/models/product')
const {ensureAdmin, ensureLogin} = require('./middleware')

router.post('/:userId', ensureLogin, async (req, res, next) => {
  console.log('hello', 'in POST route to add cart item', 'req.body', req.body)
  try {
    // need to destructure newCart because it's returned as an array
    const [newCart] = await Cart.findOrCreate({
      where: {userId: req.params.userId, orderStatus: 'Processing'},
    })
    // console.log('hello', 'cart', newCart)
    // console.log('hello', req.params.userId)
    // find the product
    const productToAdd = await Product.findOne({
      where: {
        id: req.body.id,
      },
    })

    //create new CartItem
    const newCartItem = await CartItem.create({
      cartId: newCart.id,
      productId: productToAdd.id,
      quantity: 1,
      price: productToAdd.price,
    })

    console.log('hello', newCartItem)

    //Send all products in that cart
    const getCart = await Cart.findByPk(newCart.id)
    const products = await getCart.getProducts()
    console.log('hello', 'products', products)

    res.status(201).send(products)
    // res.send(newCart)
  } catch (err) {
    next(err)
  }
})

// get cart for logged in user
router.get('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    const cart = await Cart.findOne({
      where: {
        userId: userId,
      },
    })
    if (cart) {
      const products = await cart.getProducts()
      res.json(products)
    }
  } catch (err) {
    next(err)
  }
})

//updating quantity in cart
router.put('/:cartId/product/:productId', async (req, res, next) => {
  try {
    //might delete product eager load
    const cart = await CartItem.findOne({
      where: {
        productId: req.params.cartItemId,

        cartId: req.params.cartId,
      },
      include: [{model: Cart, include: [{model: Product}]}],
    })
    res.json(await cart.update(req.body))
  } catch (err) {
    next(err)
  }
})

// delete an item from the cart
router.delete('/:cartId/:productId', ensureLogin, async (req, res, next) => {
  try {
    const cartItem = await CartItem.findOne({
      where: {
        cartId: req.params.cartId,
        productId: req.params.productId,
      },
    })
    await cartItem.destroy()
    res.json(cartItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router

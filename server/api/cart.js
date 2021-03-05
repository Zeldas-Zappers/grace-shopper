const router = require('express').Router()
const Cart = require('../db/models/cart')
const CartItem = require('../db/models/cartItem')
const User = require('../db/models/user')
const Product = require('../db/models/product')
const {ensureAdmin, ensureLogin} = require('./middleware')

// //Just another approach below - I don't think this is right other than using the magic method on line 33
// router.post('/:userId', async (req, res, next) => {
//   //would be sending the product from the frontend to this route so product will be on req.body

//   try {
//     //create cart item (this needs to be findOrCreate({ where: {id: req.params.userId}}))
//     const newCart = await Cart.create();

//     //find the product
//     const productToAdd = await Product.findOne({
//       where: {
//         id: req.body.id,
//       }
//     })

//     //create new CartItem
//     const newCartItem = await CartItem.create({
//       cartId: newCart.id,
//       productId: productToAdd.id,
//       quantity: 1,
//       price: productToAdd.price
//     });

//     //Send all products in that cart
//     const getCart = await Cart.findByPk(newCart.id)
//     const products = await getCart.getProducts();

//     res.status(201).send(products);
//   } catch(err) {
//     next(err);
//   }
// })

router.post(
  '/:userId',
  /* ensureLogin, */ async (req, res, next) => {
    // if the user is logged in,
    // if there is no cart open at all, create one
    // if there is a cart but it's 'Fulfilled', create one
    // if there is a cart with status 'Processing', check if product already exists
    // if product exists, update quantity
    // otherwise, if cart doesn't exist, create the cart and add the product

    try {
      // need to destructure newCart because it's returned as an array
      const newCart = await Cart.findOrCreate({
        where: {userId: req.params.userId, orderStatus: 'Processing'},
      })
      console.log('hello', 'cart', newCart)
      console.log('hello', req.params.userId)
      //find the product
      // const productToAdd = await Product.findOne({
      //   where: {
      //     id: req.body.productId,
      //   },
      // })

      // //create new CartItem
      // const newCartItem = await CartItem.create({
      //   cartId: newCart.id,
      //   productId: productToAdd.id,
      //   quantity: 1,
      //   price: productToAdd.price,
      // })

      // // //Send all products in that cart
      // const getCart = await Cart.findByPk(newCart.id)
      // const products = await getCart.getProducts()
      // // console.log('hello', 'products', products)

      // res.status(201).send(products)
      // res.send(newCart)
      res.send(newCart)
    } catch (err) {
      next(err)
    }
  }
)

// get cart for guest
// router.get('/:cartId', async (req, res, next) => {
//   try {
//     let cart = Cart.findOne({
//       where: {
//         id: req.params.cartId
//       },
//       include: [{model: Product}]
//     })
//     res.json(cart)

//     //below comments are just another way to grab products from a cart - not sure if this will work but want to keep it as a note:
//     // const cart = await Cart.findByPk(req.params.cartId)
//     // const products = await cart.getProducts();
//     // res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })

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

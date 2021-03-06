const router = require('express').Router()
const Cart = require('../db/models/cart')
const CartItem = require('../db/models/cartItem')
const User = require('../db/models/user')
const Product = require('../db/models/product')

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

// get cart for user
router.get('/:userId', async (req, res, next) => {
  try {
    //console.log("GET USER ROUTE", req.body)
    // let cart = Cart.findOne({
    //   where: {
    //     userId: req.params.userId
    //   },
    //   include: [{model: Product}]
    // })
    // // if the cart doesn't exist yet, create cart for user
    // if (!cart) {
    //   cart = await Cart.create({
    //     userId: req.params.guestId
    //   })
    //   cart = await Cart.findOne({
    //     where: {
    //       userId: req.params.userId
    //     },
    //     include: [{model: Product}, {model: User}]
    //   })
    // }
    const {userId} = req.params
    const cart = await Cart.findOne({
      where: {
        userId: userId
      }
    })
    console.log('CART', cart)
    if (cart) {
      const products = await cart.getProducts()
      res.json(products)
    }
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
        id: req.params.cartId
      },
      include: [{model: Product}, {model: User}]
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
        cartId: req.params.cartId
      }
    })
    const updated = await item.update(req.body)
    const updatedItem = await CartItem.findOne({
      where: {
        productId: req.params.cartItemId,
        cartId: req.params.cartId
      }
    })
    res.json(updatedItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router

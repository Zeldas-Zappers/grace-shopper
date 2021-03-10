const router = require('express').Router()
const Product = require('../db/models/product')
const {ensureLogin, ensureAdmin} = require('./middleware')

// already mounted on /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//Get a single product details
//GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params

    if (isNaN(Number(id))) {
      res.sendStatus(400)
      return
    }

    const singleProduct = await Product.findByPk(id)

    if (!singleProduct) {
      res.sendStatus(404)
      return
    }

    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

//Update single product details
//PUT /api/products/:id
router.put('/:id', ensureAdmin, async (req, res, next) => {
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)
    if (!product) {
      res.sendStatus(404)
      return
    }
    console.log('in product PUT for admins req.body', req.body)
    const {
      name,
      price,
      description,
      imageUrl,
      category,
      lighting,
      watering,
      inventory,
      count,
    } = req.body
    const updatedProduct = await product.update({
      name,
      price,
      description,
      imageUrl,
      category,
      lighting,
      watering,
      inventory,
      count,
    })

    res.send(updatedProduct)
  } catch (error) {
    next(error)
  }
})

//Create a new single product
//POST /api/products/
router.post('/', ensureAdmin, async (req, res, next) => {
  try {
    console.log('BODY', req.body)
    const {
      name,
      price,
      description,
      imageUrl,
      category,
      lighting,
      watering,
      inventory,
      count,
    } = req.body
    const newProduct = await Product.create({
      name,
      price,
      description,
      imageUrl,
      category,
      lighting,
      watering,
      inventory,
      count,
    })

    res.status(201).send(newProduct)
  } catch (error) {
    next(error)
  }
})

//Delete a single product
// DELETE /api/products/:id
router.delete('/:id', ensureAdmin, async (req, res, next) => {
  try {
    const {id} = req.params
    if (isNaN(Number(id))) {
      res.sendStatus(400)
      return
    }

    const productToBeDeleted = await Product.findByPk(id)
    if (productToBeDeleted === null) {
      res.sendStatus(404)
      return
    }
    if (productToBeDeleted) {
      await Product.destroy({
        where: {
          id: id,
        },
      })
      res.json(productToBeDeleted) //201
      return
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router

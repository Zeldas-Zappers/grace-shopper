const router = require('express').router()
const {Product} = require('../db/models')
module.exports = router

// already mounted on /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

const router = require('express').router()
const {Products} = require('../db/models')
module.exports = router

// already mounted on /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

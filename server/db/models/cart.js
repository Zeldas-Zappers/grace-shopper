const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  sessionId: {
    type: Sequelize.NUMBER,
  },

  expiration: {
    type: Sequelize.DATE,
  },
})

module.exports = Cart

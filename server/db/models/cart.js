const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  sessionId: {
    type: Sequelize.NUMBER,
  },

  expiration: {
    type: Sequelize.DATE,
  },

  status: {
    type: Sequelize.STRING,
    defaultValue: 'In progress',
  },
})

module.exports = Cart

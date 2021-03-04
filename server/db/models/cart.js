const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },

  shippingAddress: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  orderStatus: {
    type: Sequelize.ENUM('Processing', 'Fulfilled'),
    allowNull: false,
  },

  promoCode: {
    type: Sequelize.STRING,
  },

  giftWrapping: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

  giftStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

module.exports = Cart

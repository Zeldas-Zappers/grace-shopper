const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  total: {
    type: Sequelize.INTEGER,
    //allowNull: false, SM commented this out
    defaultValue: 0,
    validate: {
      min: 0
    }
  },

  shippingAddress: {
    type: Sequelize.TEXT
    //allowNull: false, SM commented this out
  },

  orderStatus: {
    type: Sequelize.ENUM('Processing', 'Fulfilled'),
    defaultValue: 'Processing' //SM added default
  },

  promoCode: {
    type: Sequelize.STRING
  },

  giftWrapping: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  giftStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Cart

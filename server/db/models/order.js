const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  items: {
    // this will probably change, maybe to a cartId?
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
  },

  total: {
    type: Sequelize.DECIMAL(10, 2),
  },

  shippingAddress: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
    },
  },

  orderStatus: {
    type: Sequelize.STRING,
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

module.exports = Order

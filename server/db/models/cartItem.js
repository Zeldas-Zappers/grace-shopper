const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  price: {
    type: Sequelize.INTEGER,
    //allowNull: false,
    defaultValue: 0,
    validate: {
      // isEmpty: false,
      notEmpty: true,
      min: 0,
    },
  },

  quantity: {
    type: Sequelize.INTEGER,
    //allowNull: false,
    defaultValue: 0,
    validate: {
      // isEmpty: false,
      notEmpty: true,
      min: 0,
    },
  },
})

module.exports = CartItem

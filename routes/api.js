const express = require('express')
const { getMenuItems } = require('./requestHandlers/getMenuItems.js')
const { getOrders } = require('./requestHandlers/getOrders.js')
const { placeOrder } = require('./requestHandlers/placeOrder.js')
const router = express.Router()

// path: /api/...
router.get('/menu/items', getMenuItems)
router.post('/order', placeOrder)
router.get('/orders', getOrders)

module.exports = router

const express = require('express')
const { getMenuItems } = require('./requestHandlers/getMenuItems.js')
const router = express.Router()

// path: /api/...
router.get('/menu/items', getMenuItems)

module.exports = router

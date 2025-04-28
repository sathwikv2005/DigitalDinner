require('dotenv').config()
const express = require('express')
const mongodb = require('./mongo')
const apiRoutes = require('./routes/api')
const app = express()
const port = process.env.PORT || 6700

// app.use(express.static(path.join(__dirname, 'build')))

app.use('/api', apiRoutes)

app.listen(port, async () => {
	console.log('Trying to establish mongoDB connection')
	await mongodb()
	console.log(`server online at http://127.0.0.1:${port}/`)
})

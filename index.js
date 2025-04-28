require('dotenv').config()
const express = require('express')
const mongodb = require('./mongo')
const apiRoutes = require('./routes/api')
const path = require('path')
const app = express()
const port = process.env.PORT || 6700

app.use(express.static(path.join(__dirname, 'dist')))

app.use(express.json())

app.use('/api', apiRoutes)

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.listen(port, async () => {
	console.log('Trying to establish mongoDB connection')
	await mongodb()
	console.log(`server online at http://127.0.0.1:${port}/`)
})

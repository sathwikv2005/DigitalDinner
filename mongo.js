const mongoose = require('mongoose')
const mongoPath = process.env.MONGODB_URI

module.exports = async () => {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	console.log('Mongo db connection established')
	return mongoose
}

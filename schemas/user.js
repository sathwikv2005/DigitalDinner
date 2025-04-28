import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	phone: {
		type: String,
		required: true,
		match: /^\d{10}$/, // must be 10 digits
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

export default mongoose.model('User', userSchema)

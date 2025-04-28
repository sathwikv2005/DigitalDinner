import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	items: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
				min: 1,
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

export default mongoose.model('Order', orderSchema)

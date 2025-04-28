import Orders from '../../schemas/orders.js'
import User from '../../schemas/user.js'

export async function getOrders(req, res) {
	const { phone } = req.query
	if (!phone) {
		return res.status(400).json({ message: 'Phone number is required' })
	}
	try {
		const user = await User.findOne({ phone })
		if (!user) {
			return res.status(404).json({ message: 'No user found with the provided phone number.' })
		}

		const orders = await Orders.find({ userId: user._id })

		if (orders.length === 0) {
			return res.status(200).json({ message: 'No orders found for this user.' })
		}

		return res.status(200).json({ orders })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'An error occurred while fetching orders.' })
	}
}

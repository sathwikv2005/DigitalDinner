import User from '../../schemas/user'
import Orders from '../../schemas/orders'

export async function placeOrder(req, res) {
	const { user, cartItems } = req.body

	try {
		let existingUser = await User.findOne({ phone: user.phone })

		if (!existingUser) {
			existingUser = new User({
				name: user.name,
				phone: user.phone,
			})
			await existingUser.save()
		}

		const items = cartItems.map((cartItem) => ({
			_id: cartItem.id,
			quantity: cartItem.quantity,
		}))

		const order = new Orders({
			userId: existingUser._id,
			items,
		})

		await order.save()

		return res.status(201).json({
			message: 'Order placed successfully',
			order,
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'An error occurred while placing the order.' })
	}
}

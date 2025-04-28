import Order from '../../schemas/orders.js'
import User from '../../schemas/user.js'
import MenuItem from '../../schemas/menuItem.js'

export async function placeOrder(req, res) {
	const { user, cartItems } = req.body
	if (!user || !cartItems || cartItems.length === 0) {
		return res.status(400).json({ message: 'User or cart items are missing' })
	}

	try {
		let existingUser = await User.findOne({ phone: user.phone })
		if (!existingUser) {
			existingUser = new User({
				name: user.name,
				phone: user.phone,
			})
			await existingUser.save()
		}

		const items = []
		for (let cartItem of cartItems) {
			const menuItem = await MenuItem.findById(cartItem._id)
			if (!menuItem) {
				return res.status(400).json({ message: `Menu item with ID ${cartItem._id} not found` })
			}

			items.push({
				_id: menuItem._id,
				quantity: cartItem.quantity,
			})
		}

		const order = new Order({
			userId: existingUser._id,
			items: items,
		})
		await order.save()

		res.status(201).json({ message: 'Order placed successfully', order })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

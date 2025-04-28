export async function checkOut(user, cartItems) {
	try {
		// Prepare the payload
		const orderData = {
			user,
			cartItems,
		}

		// Make the POST request to the backend to place the order
		const response = await fetch('/api/order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderData),
		})

		if (!response.ok) {
			console.log(await response.json())
			throw new Error('Failed to place the order')
		}

		const result = await response.json()

		if (result.message === 'Order placed successfully') {
			return true
		} else {
			return false
			console.error(result.message)
		}
	} catch (error) {
		console.error('Error during checkout:', error)
	}
}

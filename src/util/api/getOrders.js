export async function getOrders(phone) {
	const response = await fetch(`/api/orders?phone=${phone}`)
	if (!response.ok) {
		console.error('Failed to fetch orders', response)
		return null
	}
	const orders = await response.json()

	return orders.orders
}

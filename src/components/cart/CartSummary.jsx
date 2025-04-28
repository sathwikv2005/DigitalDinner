import style from '../../css/cart.module.css'
import { IoBagCheckOutline } from 'react-icons/io5'
import { addCache, getCache, updateCache } from '../../util/cache'

import { checkOut } from '../../util/api/checkOut'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function CartSummary({ total, tax, grandTotal }) {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	async function handleCheckout() {
		setLoading(true)
		let userCache = await getCache('user')
		let user = userCache?.obj || null

		const now = Date.now()

		if (!user || !user.createdAt || now - user.createdAt > 24 * 60 * 60 * 1000) {
			const name = prompt('Enter your name:')
			if (!name || name.trim().length === 0) {
				alert('Name cannot be empty')
				return
			}

			let phone = prompt('Enter your 10-digit phone number:')
			if (!/^\d{10}$/.test(phone)) {
				alert('Invalid phone number. Must be 10 digits.')
				return
			}

			user = {
				name: name.trim(),
				phone: phone,
				createdAt: now,
			}

			addCache('user', user)
		}

		const cartItemCache = getCache('cartItems') // items with quantity
		const cartCache = getCache('cart') // all item ids

		const cartItems = cartItemCache?.obj || []
		const cartIds = cartCache?.obj || []

		if (cartIds.length === 0) {
			alert('Your cart is empty!')
			return
		}

		// Build finalCartItems with quantity
		const finalCartItems = cartIds.map((id) => {
			const found = cartItems.find((item) => item._id === id)
			return {
				_id: id,
				quantity: found ? found.quantity : 1, // use existing quantity if available, else 1
			}
		})

		const response = await checkOut(user, finalCartItems)
		setLoading(false)
		if (response) {
			updateCache('cartItems', [])
			updateCache('cart', [])
			navigate('/orders')
		} else {
			alert('Failed to place order. Please try again.')
		}
	}

	return (
		<div className={style.cartSummary}>
			<div className={style.priceContainer}>
				<div className={style.priceTotal}>Subtotal: ₹{total.toFixed(2)}</div>
				<div className={style.priceTax}>Tax (18% GST): ₹{tax.toFixed(2)}</div>
				<div className={style.grandTotal}>
					Grand Total: <span>₹{grandTotal.toFixed(2)}</span>
				</div>
				<div className={`${style.checkout} ${loading ? 'loading' : ''}`} onClick={handleCheckout}>
					Order <IoBagCheckOutline className={style.icon} />
				</div>
			</div>
		</div>
	)
}

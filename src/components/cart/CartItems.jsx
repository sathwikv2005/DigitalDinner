import { useState, useEffect } from 'react'
import style from '../../css/cart.module.css'
import menuDisplayStyle from '../../css/menuDisplay.module.css'

import { MdOutlineDeleteForever } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { getCache, updateCache } from '../../util/cache'
import CartSummary from './CartSummary'

export default function CartItems({ menuItems, handleClick, cart }) {
	const [cartItems, setCartItems] = useState([]) // stores [{ _id, quantity }]

	useEffect(() => {
		async function loadCartItems() {
			const cached = await getCache('cartItems')
			if (cached?.obj) {
				setCartItems(cached.obj)
			}
		}
		loadCartItems()
	}, [])

	function handleInput(id, quantity) {
		if (isNaN(quantity) || quantity < 1) quantity = 1 // minimum quantity 1

		setCartItems((prev) => {
			let updated = [...prev]
			const index = updated.findIndex((item) => item._id === id)

			if (index !== -1) {
				updated[index].quantity = quantity
			} else {
				updated.push({ _id: id, quantity })
			}

			updateCache('cartItems', updated)
			return updated
		})
	}

	// Calculate totals
	function calculateTotals() {
		let total = 0

		for (let item of menuItems) {
			if (cart.has(item._id)) {
				const cartItem = cartItems.find((ci) => ci._id === item._id)
				const quantity = cartItem ? cartItem.quantity : 1
				total += item.price * quantity
			}
		}

		const tax = total * 0.18
		const grandTotal = total + tax

		return { total, tax, grandTotal }
	}

	const { total, tax, grandTotal } = calculateTotals()

	return (
		<div className={style.cartItems}>
			<div className={menuDisplayStyle.itemContainer}>
				{cart.size === 0 ? (
					<div className={style.cartEmpty}>
						<div>Cart is empty...</div>
						<Link to="/menu" className={`${style.cartEmptyBtnContainder} sour-gummy`}>
							<button className="sour-gummy">Add items to cart</button>
						</Link>
					</div>
				) : (
					<>
						<CartList
							menuItems={menuItems}
							handleClick={handleClick}
							cart={cart}
							cartItems={cartItems}
							handleInput={handleInput}
						/>
						<CartSummary total={total || 0} tax={tax || 0} grandTotal={grandTotal || 0} />
					</>
				)}
			</div>
		</div>
	)
}

function CartList({ menuItems, handleClick, cart, cartItems, handleInput }) {
	function getQuantity(id) {
		const item = cartItems.find((obj) => obj._id === id)
		return item ? item.quantity : 1
	}

	return (
		<>
			{menuItems.map((item) => {
				return (
					cart.has(item._id) && (
						<div key={item._id} className={menuDisplayStyle.item}>
							<div className={`${menuDisplayStyle.left} ${menuDisplayStyle.box}`}>
								<div className={menuDisplayStyle.itemTitle}>{item.name}</div>
								<div className={menuDisplayStyle.itemDes}>{item.description}</div>
							</div>
							<div className={`${menuDisplayStyle.right} ${menuDisplayStyle.box}`}>
								<div className={style.details}>
									<div className={menuDisplayStyle.itemPrice}>₹{item.price} ×</div>
									<input
										type="number"
										className={style.input}
										value={getQuantity(item._id)}
										onChange={(e) => handleInput(item._id, parseInt(e.target.value))}
									/>
								</div>
								<div
									id={item._id}
									className={menuDisplayStyle.iconContainer}
									onClick={() => handleClick(item)}
								>
									<MdOutlineDeleteForever color="red" />
								</div>
							</div>
						</div>
					)
				)
			})}
		</>
	)
}

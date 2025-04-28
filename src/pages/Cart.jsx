import { useState, useEffect } from 'react'
import { getMenuItems } from '../util/api/getMenuItems'
import { getCache, updateCache } from '../util/cache'

import style from '../css/cart.module.css'
import Loading from '../components/Loading'
import CartItems from '../components/cart/CartItems'
import CartSummary from '../components/cart/CartSummary'

export default function Cart() {
	const [loading, setLoading] = useState(true)
	const [cart, setCart] = useState(new Set())
	const [menuItems, setMenuItems] = useState([])

	function handleClick(item) {
		const newCart = new Set(cart)
		newCart.delete(item._id)
		setCart(newCart)
		updateCache('cart', Array.from(newCart))
	}

	useEffect(() => {
		async function call() {
			setLoading(true)
			await getCart()
			await callGetMenuItems()
			setLoading(false)
		}
		async function callGetMenuItems() {
			const data = await getMenuItems()
			setMenuItems(data)
		}
		async function getCart() {
			let cartData = await getCache('cart')
			if (cartData) {
				setCart(new Set(cartData.obj))
			}
		}
		call()
	}, [])

	return loading ? (
		<Loading />
	) : (
		<div className={style.container}>
			<CartItems menuItems={menuItems} handleClick={handleClick} cart={cart} />
		</div>
	)
}

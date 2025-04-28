import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import MenuNav from '../components/menu/MenuNav'
import DisplayMenu from '../components/menu/DisplayMenu'
import { getMenuItems } from '../util/api/getMenuItems'
import style from '../css/home.module.css'
import { getCache, updateCache } from '../util/cache'

const allCategories = ['Appetizers', 'Main Courses', 'Desserts', 'Drinks']

export default function Home() {
	const [loading, setLoading] = useState(true)
	const [menuItems, setMenuItems] = useState([])
	const [activeCategory, setActiveCategory] = useState('All')
	const [cart, setCart] = useState(new Set())

	function onCategoryClick(e) {
		setActiveCategory(e.target.id)
	}

	function updateCart(newCart) {
		updateCache('cart', Array.from(newCart))
	}

	function handleAddToCart(itemId) {
		setCart((prevCart) => {
			const newCart = new Set(prevCart)
			newCart.add(itemId)
			updateCart(newCart)
			return newCart
		})
	}

	function handleDeleteToCart(itemId) {
		setCart((prevCart) => {
			const newCart = new Set(prevCart)
			newCart.delete(itemId)
			updateCart(newCart)
			return newCart
		})
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
			console.log(cartData)
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
			<MenuNav categories={allCategories} active={activeCategory} onClick={onCategoryClick} />
			<DisplayMenu
				active={activeCategory}
				menuData={
					activeCategory === 'All'
						? menuItems
						: menuItems.filter((item) => item.category === activeCategory)
				}
				addCart={handleAddToCart}
				deleteCart={handleDeleteToCart}
				cart={cart}
			/>
		</div>
	)
}

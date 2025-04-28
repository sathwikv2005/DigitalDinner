import { useEffect } from 'react'
import { useState } from 'react'
import { getOrders } from '../util/api/getOrders'

import cartStyle from '../css/cart.module.css'
import style from '../css/orders.module.css'
import Loading from '../components/Loading'
import { getCache } from '../util/cache'
import { Link } from 'react-router-dom'

export default function Order() {
	const [orders, setOrders] = useState([])
	const [menu, setMenu] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		async function callGetOrders() {
			setLoading(true)
			let userCache = getCache('user')
			let user = userCache?.obj || null
			if (!user) return setLoading(false)

			const ordersData = await getOrders(user.phone)
			const menuItems = getCache('menuitems')
			setMenu(menuItems.obj)
			setOrders(ordersData)
			setLoading(false)
		}
		callGetOrders()
	}, [])

	return loading ? (
		<Loading />
	) : !orders || orders.length === 0 ? (
		<div className={cartStyle.cartEmpty}>
			<div>No orders yet...</div>
			<Link to="/menu" className={`${cartStyle.cartEmptyBtnContainder} sour-gummy`}>
				<button className="sour-gummy">Add items to cart</button>
			</Link>
		</div>
	) : (
		<OrdersList orders={orders} menu={menu} />
	)
}

function OrdersList({ orders, menu }) {
	return (
		<div className={style.orders}>
			{orders.map((order) => {
				return (
					<div key={order._id} className={style.order}>
						<div className={`${style.box} ${style.left}`}>
							<div className={style.time}>
								Ordered at: {new Date(order.createdAt).toLocaleString()}
							</div>
							<div className={style.items}>
								{order.items.map((item) => {
									const menuItem = menu.find((x) => x._id === item._id)
									return <div className={style.item}>{menuItem.name}</div>
								})}
							</div>
						</div>
						<div className={`${style.box} ${style.right}`}>
							<div className={`${style.price} inter`}>{order.cost}</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

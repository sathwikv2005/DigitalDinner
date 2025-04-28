import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { MdOutlineDeleteForever } from 'react-icons/md'

import style from '../../css/home.module.css'
import menuDisplayStyle from '../../css/menuDisplay.module.css'
import { useState } from 'react'

export default function DisplayMenu({ menuData, active, cart, addCart, deleteCart }) {
	function handleClick(item) {
		console.log(item)
		if (cart.has(item._id)) {
			deleteCart(item._id)
		} else {
			addCart(item._id)
		}
	}

	return (
		<div className={style.menuContainer}>
			<div className={menuDisplayStyle.heading}>{active}</div>
			<div className={menuDisplayStyle.itemContainer}>
				{menuData.map((item) => {
					return (
						<div key={item._id} className={menuDisplayStyle.item}>
							<div className={`${menuDisplayStyle.left} ${menuDisplayStyle.box}`}>
								<div className={menuDisplayStyle.itemTitle}>{item.name}</div>
								<div className={menuDisplayStyle.itemDes}>{item.description}</div>
							</div>
							<div className={`${menuDisplayStyle.right} ${menuDisplayStyle.box}`}>
								<div className={menuDisplayStyle.itemPrice}>₹{item.price}</div>
								<div
									id={item._id}
									className={menuDisplayStyle.iconContainer}
									onClick={() => handleClick(item)}
								>
									{cart.has(item._id) ? (
										<MdOutlineDeleteForever color="red" />
									) : (
										<MdOutlineAddShoppingCart />
									)}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

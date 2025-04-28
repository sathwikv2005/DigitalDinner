import { Link } from 'react-router-dom'
import { BsCart3 } from 'react-icons/bs'
import React from 'react'

export default function NavBar() {
	return (
		<>
			<div className="navbar">
				<div className="navbar--title">
					<Link className="navbar--title--link sour-gummy" to="/">
						Digital Dinner
					</Link>
				</div>
				<div className="nav--right-items inter">
					<Link to="/orders">Orders</Link>
					<Link to="/menu">Menu</Link>
					<Link to="/cart" className="navbar--cart--a">
						<BsCart3 className="navbar--cart--icon" />
					</Link>
				</div>
			</div>
		</>
	)
}

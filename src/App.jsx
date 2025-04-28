import { Routes, Route } from 'react-router-dom'
import './App.css'
import Error404 from './pages/Error404'
import Cart from './pages/Cart'
import NavBarLayout from './layouts/navBarLayout.jsx'
import Home from './pages/Home.jsx'
import Order from './pages/Order.jsx'

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<NavBarLayout />}>
				<Route index element={<Home />} />
				<Route path="/menu" element={<Home />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/orders" element={<Order />} />
				<Route path="*" element={<Error404 />} />
			</Route>
		</Routes>
	)
}

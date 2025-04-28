import { getCache, addCache } from '../cache'

const CACHE_KEY = 'menuitems'
const CACHE_EXPIRY = 10 * 60 * 1000 // 10 minutes

export async function getMenuItems() {
	let menuItems = await getCache(CACHE_KEY)
	if (!menuItems || Date.now() - menuItems.createdAt > CACHE_EXPIRY) {
		const response = await fetch('/api/menu/items')
		if (!response.ok) {
			console.log(response)
		}
		menuItems = await response.json()
		addCache(CACHE_KEY, menuItems)
		return menuItems
	}
	return menuItems.obj
}

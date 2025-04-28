import MenuItem from '../schemas/menuItem.js'
import { addCache, getCache } from './cache.js'

const CACHE_KEY = 'menuitems'
const CACHE_EXPIRY = 10 * 60 * 1000 // 10 minutes

export async function fetchMenuItems() {
	let cacheData = await getCache(CACHE_KEY)

	if (!cacheData || Date.now() - cacheData.createdAt > CACHE_EXPIRY) {
		const items = await MenuItem.find({})
		addCache(CACHE_KEY, items)
		return items
	}

	return cacheData.obj
}

import { fetchMenuItems } from '../../util/fetchMenuItems.js'

export async function getMenuItems(req, res) {
	const menuItems = await fetchMenuItems()

	return res.json(menuItems)
}

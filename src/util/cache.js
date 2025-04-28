export function addCache(name, obj) {
	const cacheObj = {
		name,
		obj,
		createdAt: Date.now(),
	}

	const cache = JSON.parse(localStorage.getItem('cache')) || []
	cache.push(cacheObj)
	localStorage.setItem('cache', JSON.stringify(cache))
}

export async function getCache(name) {
	const cache = JSON.parse(localStorage.getItem('cache')) || []

	const cacheObj = cache.find((x) => x.name === name)
	if (!cacheObj) return null
	return cacheObj
}

export function updateCache(name, newObj) {
	const cache = JSON.parse(localStorage.getItem('cache')) || []

	const index = cache.findIndex((x) => x.name === name)
	if (index === -1) return false

	cache[index] = {
		name,
		obj: newObj,
		createdAt: Date.now(),
	}

	localStorage.setItem('cache', JSON.stringify(cache))
	return true
}

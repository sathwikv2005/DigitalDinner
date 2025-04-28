let cache = []

export function addCache(name, obj) {
	const cacheObj = {
		name,
		obj,
		createdAt: Date.now(),
	}
	cache.push(cacheObj)
}

export async function getCache(name) {
	const index = cache.findIndex((x) => x.name === name)
	if (index === -1) return false
	return cache[index]
}

export function updateCache(name, newObj) {
	const index = cache.findIndex((x) => x.name === name)
	if (index === -1) return false

	cache[index] = {
		name,
		obj: newObj,
		createdAt: Date.now(),
	}
	return true
}

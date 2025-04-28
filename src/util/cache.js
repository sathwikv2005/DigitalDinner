export function addCache(name, obj) {
	const cacheObj = {
		obj,
		createdAt: Date.now(),
	}

	localStorage.setItem(name, JSON.stringify(cacheObj))
	return true
}

export function getCache(name) {
	const cacheObj = localStorage.getItem(name)
	if (!cacheObj) return null

	return JSON.parse(cacheObj)
}

export function updateCache(name, newObj) {
	const cacheObj = {
		obj: newObj,
		createdAt: Date.now(),
	}

	localStorage.setItem(name, JSON.stringify(cacheObj))
	return true
}

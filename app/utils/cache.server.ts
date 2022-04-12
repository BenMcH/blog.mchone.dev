import TTLCache from '@isaacs/ttlcache';

declare global {
	var __cache: TTLCache;
}

const cache = global.__cache ||= new TTLCache({ max: 10000, ttl: 1000 * 60 * 10 });

export async function get<T>(key: string, callback?: () => Promise<T> | T): Promise<T | undefined> {
	let data = cache.get<T>(key);

	if (!data && callback) {
		data = await callback();

		cache.set(key, data)
	}

	return data;
}

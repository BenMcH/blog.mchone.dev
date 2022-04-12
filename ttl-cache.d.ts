declare module '@isaacs/ttlcache' {
	export default class TTLCache {
		constructor(options: {
			max: number;
			ttl: number;
		});
		get<T>(key: string): T | undefined;
		set<T>(key: string, value: T): void;
		del(key: string): void;
		clear(): void;
	}
}

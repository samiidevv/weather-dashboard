import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { Name } from './user';

export function localStore<T>(key: string, initial: T) {
	if (!browser) return writable(initial);

	const store = writable(initial);

	let currentUser = '';

	store.subscribe((val) => {
		if (!currentUser) return;
		localStorage.setItem(`${key}-${currentUser}`, JSON.stringify(val));
	});

	Name.subscribe((userName) => {
		if (!userName) return;
		currentUser = userName;

		const userKey = `${key}-${userName}`;
		const stored = localStorage.getItem(userKey);
		const value = stored ? JSON.parse(stored) : initial;
		store.set(value);
	});

	return store;
}

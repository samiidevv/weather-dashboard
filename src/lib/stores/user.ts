import { writable, readonly } from 'svelte/store';

const _Name = writable('User');

export const Name = readonly(_Name);

export const setName = (newName: string) => {
	_Name.set(newName);
};

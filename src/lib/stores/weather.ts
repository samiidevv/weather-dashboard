import { writable } from 'svelte/store';
import { localStore } from './localStore';

export const cities = localStore<string[]>('cities', ['Tehran', 'London', 'Tokyo']);
export const city = localStore<string>('city', 'Tehran');
export const weather = writable<any>(null);
export const forecast = writable<any>(null);

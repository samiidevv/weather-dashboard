<script lang="ts">
	import { WeatherIcon } from '$lib';
	import { Settings, Sun, Moon, LogOut } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib';
	import { Name } from '$lib';

	import { cities, city } from '$lib/stores/weather';

	let newCity = $state('');
	let settings = $state(false);

	const handleSettings = () => (settings = !settings);

	const addNewCity = () => {
		if (!newCity.trim()) return;
		cities.update((c) => [...c, newCity.trim()]);
		city.set(newCity.trim());
		newCity = '';
	};
</script>

<header>
	<div class="flex h-20 justify-between px-4 py-2 shadow-2xl">
		<div class="flex items-center gap-2">
			<img src={WeatherIcon} alt="" class="h-12 w-12 rounded-full" />
			<h3>{$Name}'s Dashboard</h3>
		</div>
		<div class="flex items-center gap-4">
			<input type="text" bind:value={newCity} placeholder="Enter New City" class="rounded-sm" />
			<button onclick={addNewCity} class="-ml-15 rounded-sm bg-blue-800 p-2 text-white">Add</button>
			<select bind:value={$city} class="rounded-sm">
				{#each $cities as c}
					<option value={c}>{c}</option>
				{/each}
			</select>
			<div use:clickOutside={() => (settings = false)} class="relative">
				<Settings
					onclick={handleSettings}
					class="h-10 w-10 rounded-sm border border-gray-600 p-1 text-4xl text-gray-600 transition hover:bg-gray-400 hover:text-white {settings
						? 'bg-blue-300 text-black'
						: ''}"
				/>
				{#if settings}
					<div class="absolute top-12 right-0 rounded-xl bg-white p-2">
						<div>
							<div class="border-b border-gray-300 p-2">
								<h3 class="text-lg font-bold">Mode</h3>
								<div
									class="mt-1 flex justify-center divide-x divide-gray-300 rounded-lg border border-gray-300"
								>
									<button class="flex items-center gap-2 px-4 py-2"><Sun /> Light</button>
									<button class="flex items-center gap-2 px-4 py-2">
										<Moon /> Dark
									</button>
								</div>
							</div>
						</div>
						<div>
							<div class="border-b border-gray-300 p-2">
								<h3 class="text-lg font-bold">Language</h3>
								<div
									class="mt-1 flex justify-center divide-x divide-gray-300 rounded-lg border border-gray-300"
								>
									<button class="flex items-center gap-2 px-4 py-2">English</button>
									<button class="flex items-center gap-2 px-4 py-2">Persian</button>
								</div>
							</div>
						</div>
						<button
							class="mt-4 flex items-center gap-2 pl-2 text-lg font-bold"
							onclick={() => goto('/')}><LogOut /> Logout</button
						>
					</div>{/if}
			</div>
		</div>
	</div>
</header>

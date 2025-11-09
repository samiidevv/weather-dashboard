<script lang="ts">
	import { weather, city } from '$lib/stores/weather';
	import { MapPin } from 'lucide-svelte';

	const getCurrentWeather = async () => {
		if (!$city) return;
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${$city}&appid=0c7725d44dd0c8be52bc9c76d314bee0&units=metric`
			);
			weather.set(await res.json());
		} catch (err) {
			console.error('Error fetching weather:', err);
		}
	};

	$effect(() => {
		getCurrentWeather();
	});

	const formatDateTime = (dt: number, timezone: number) => {
		const localTime = (dt + timezone) * 1000;
		const date = new Date(localTime);

		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const dayName = days[date.getUTCDay()];

		const formattedDate = date.toLocaleDateString('en-US', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});

		const formattedTime = date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		});

		return { dayName, formattedDate, formattedTime };
	};
	const info = $derived($weather ? formatDateTime($weather.dt, $weather.timezone) : null);
</script>

<div class="rounded-lg bg-[#E1E9EE]">
	{#if $weather}
		<div class="flex justify-between p-4">
			<div class=" flex flex-1/2 flex-col gap-8">
				<div>
					<div class="flex w-[50%] gap-2 rounded-4xl bg-[#CDD9E0] p-3">
						<MapPin />
						<h2 class="font-bold">{$weather.name}</h2>
					</div>
				</div>
				<div>
					<h1 class="text-5xl font-bold text-[#003464]">{info?.dayName}</h1>
					<div class="flex gap-4">
						<p class="font-semibold text-[#003464]">{info?.formattedDate}</p>
						<p class="font-semibold text-[#003464]">{info?.formattedTime}</p>
					</div>
				</div>
				<div>
					<h1 class="text-5xl font-bold text-[#003464]">
						{Math.round($weather.main.temp)} °C
					</h1>
					<div class="flex gap-4">
						<p class="font-semibold text-[#003464]">High:{Math.round($weather.main.temp_max)}</p>
						<p class="font-semibold text-[#003464]">Low:{Math.round($weather.main.temp_min)}</p>
					</div>
				</div>
			</div>
			<div class="flex flex-1/2 flex-col items-center justify-center">
				<img
					src={`http://openweathermap.org/img/wn/${$weather.weather[0].icon}@4x.png`}
					alt={$weather.weather[0].description}
				/>
				<div class="flex flex-col gap-2">
					<h1 class="pl-2 text-3xl font-bold text-[#003464]">{$weather.weather[0].main}</h1>
					<p class="font-semibold text-[#003464]">
						feels Like {Math.round($weather.main.feels_like)} °C
					</p>
				</div>
			</div>
		</div>
	{/if}
</div>

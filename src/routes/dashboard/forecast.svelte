<script lang="ts">
	import { city, forecast } from '$lib/stores/weather';

	const getForecastWeather = async () => {
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${$city}&appid=0c7725d44dd0c8be52bc9c76d314bee0&units=metric`
			);
			const data = await res.json();
			const uniqueDays: any[] = [];
			const seenDates = new Set();

			for (const item of data.list) {
				const day = item.dt_txt.split(' ')[0];

				if (!seenDates.has(day)) {
					seenDates.add(day);
					uniqueDays.push(item);
				}
			}

			forecast.set(uniqueDays);
		} catch (err) {
			console.error('Error fetching forecast:', err);
		}
	};
	$effect(() => {
		getForecastWeather();
	});
</script>

<div class="col-span-2 rounded-lg bg-[#E1E9EE]">
	<div class="p-4">
		<h3 class="text-2xl font-semibold text-[#003464]">5 Days Forecast</h3>
		<div class="mt-2">
			<ul class="flex gap-1 overflow-hidden">
				{#if $forecast}
					{#each $forecast as item}
						<li
							class="flex h-64 flex-col items-center justify-between rounded-2xl bg-[#CDD9E0] px-2 py-4"
						>
							<div class="text-center">
								<p class="mx-auto text-[#003464]">
									{new Date(item.dt_txt).toLocaleString('en-US', {
										weekday: 'short'
									})}
								</p>
								<div
									class="mx-auto h-px w-12 bg-linear-to-r from-transparent via-gray-400 to-transparent"
								></div>
							</div>
							<img
								src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
								alt={item.weather[0].description}
								class="h-24 w-24"
							/>
							<p class="text-xl font-medium text-[#003464]">{Math.round(item.main.temp)}°C</p>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	</div>
</div>

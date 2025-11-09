<script lang="ts">
	import Chart from './chart.svelte';
	import Forecast from './forecast.svelte';
	import Current from './current.svelte';
</script>

<main>
	<div class="grid grid-cols-2 gap-6 p-4">
		<Current />
		<Chart />
		<Forecast />
	</div>
</main>
<footer></footer>

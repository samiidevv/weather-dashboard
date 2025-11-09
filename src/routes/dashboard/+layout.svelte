<script lang="ts">
	let { children } = $props();
	import { Name } from '$lib';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
</script>

<svelte:head>
	<title>{$Name}'s Dashboard</title>
</svelte:head>

<div class="flex h-screen flex-col">
	<Header />
	<div class="flex-1">{@render children?.()}</div>
	<Footer />
</div>

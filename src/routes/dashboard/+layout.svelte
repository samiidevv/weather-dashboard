<script lang="ts">
	let { children } = $props();
	import { Name } from '$lib';
	import Header from './header.svelte';
</script>

<svelte:head>
	<title>{$Name}'s Dashboard</title>
</svelte:head>

<Header />
{@render children?.()}

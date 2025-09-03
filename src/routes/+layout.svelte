<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';

	let { children } = $props();



</script>

<svelte:head>
	<link rel="icon" href="/favicon.webp" />
</svelte:head>
<Header  />
{@render children?.()}

<footer class="text-center pb-4 text-dark mt-16 flex lg:flex-row flex-col justify-center items-center gap-2">
	<div>
		&copy; {new Date().getFullYear()} ByMeklit. All rights reserved.
	</div>
	<div>
		Powered by <a href="http://leoradigitals.com" target="_blank" class="hover:text-pink">Leora Digital</a>
	</div>
</footer>



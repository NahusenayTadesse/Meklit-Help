<script lang="ts">
    import Helps from '$lib/Helps.svelte';
    let { data } = $props();
</script>

<svelte:head>
    <title>Help Center</title>
    <meta name="description" content="Find help articles and resources." />
</svelte:head>

<Helps data={data.helps} help="Help for Everyone" />
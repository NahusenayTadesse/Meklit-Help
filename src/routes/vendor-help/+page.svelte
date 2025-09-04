<script>
    import Helps from '$lib/Helps.svelte';
    let../vender-help/$types.js { data } = $props();
</script>

<svelte:head>
    <title>Vendor Help Center</title>
    <meta name="description" content="Find help articles and resources." />
</svelte:head>

<Helps data={data.helps} help="Help for Vendors" />
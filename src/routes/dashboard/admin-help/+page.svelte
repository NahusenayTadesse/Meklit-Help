<script>
    import Helps from "$lib/Helps.svelte";
    let {data} = $props();
</script>

<svelte:head>
    <title>Admin Help Center</title>
    <meta name="description" content="Find help articles and resources for admin users." />
</svelte:head>

<Helps data={data.helps} help="ByMeklit Site Help Guide" />
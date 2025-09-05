<script lang="ts">
    import Helps from '$lib/Helps.svelte';
    let { data } = $props();
</script>

<svelte:head>
    <title>Help Center</title>
    <meta name="description" content="Find help articles and resources." />
    <meta name="keywords" content="Bymeklit Shop, help, support, FAQ, resources, ecommerce, seller guide" />
    <meta property="og:title" content="Help Center | Bymeklit Shop" />
    <meta property="og:description" content="Get support and answers for customers at Bymeklit Shop." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://help.bymeklit.com/vendor-help" />
    <meta property="og:site_name" content="Bymeklit Shop" />
    <meta name="author" content="Bymeklit Shop" />
</svelte:head>

<Helps data={data.helps} help="Help for Everyone" />
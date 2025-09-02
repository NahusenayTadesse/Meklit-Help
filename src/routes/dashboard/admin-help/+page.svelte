<script>
    import Helps from "$lib/Helps.svelte";
    let {data} = $props();
</script>

<Helps data={data.helps} help="ByMeklit Site Help Guide" />
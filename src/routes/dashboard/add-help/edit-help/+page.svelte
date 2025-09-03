<script>
	import { btnFilled } from '$lib/global.svelte';
    let {data, form} = $props();
    import RichTextEditor from '$lib/RichTextEditor.svelte';
	import { BadgeMinus, HardDriveUpload } from 'lucide-svelte';

     const helps = $state(data.helps);
    let searchQuery = $state('');
    let filteredHelps = $state(helps); // Add this

    function filterHelps(query) {
        console.log('Filtering helps with query:', query, query.length);
        if (!query) {
            filteredHelps = helps; // Reset to original
            return;
        }

        const queryTerms = query.trim().toLowerCase().split(/\s+/).filter(term => term.length > 0);
        if (queryTerms.length === 0) {
            filteredHelps = helps;
            return;
        }

        filteredHelps = helps.filter(help => {
            const search = `${help.title ?? ''} ${help.description ?? ''}`.toLowerCase();
            return queryTerms.some(term => search.includes(term));
        });
    }
</script>

<div class="flex flex-row justify-end items-center">
<input 
    type="search" 
    bind:value={searchQuery} 
    oninput={() => filterHelps(searchQuery)} 
    placeholder="Search help..." 
    class="shadow-md border-1 border-dark/20 rounded-lg 
    p-2 lg:w-sm m-4 fixed top-20 right-2 bg-white z-10 focus:border-white focus:ring-1 
    focus:ring-pink/50 focus:shadow-pink/30 focus:outline-none
     transition-all duration-300 ease-in-out justify-self-end"
/>
</div>

<div class="flex lg:flex-row flex-col flex-wrap gap-4 justify-center items-center overflow-y-auto p-4">
    {#each filteredHelps as help}
        <form method="POST" class="lg:w-[500px] flex flex-col gap-4 p-4 shadow-2xl rounded-md mb-8" >
            <input type="text" class="border-2 border-gray-300 p-2 rounded-md w-full" name="title" value={help.title}>
            <RichTextEditor bind:value={help.description} />

           
            <input type="hidden" name="id" value={help.id}>
            <input type="text" name="description" bind:value={help.description}>
            <div class="flex flex-row gap-2 lg:w-2/3 w-full">
            <button type="submit" class="{btnFilled} flex flex-row gap-2 w-[120px]"><HardDriveUpload /> Save Edit</button>
            <button type="submit" formaction="?/delete" class="{btnFilled} !bg-red-500 w-[120px] !text-white flex flex-row gap-2">
            <BadgeMinus />Delete</button>
            </div>
        </form>
    {/each}
</div>
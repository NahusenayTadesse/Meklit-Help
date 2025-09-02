<script>
	import Accordion from '$lib/Accordion.svelte';
	import { Frown, Loader } from 'lucide-svelte';

    let { data, help="Help" } = $props();
    const helps = $state(data);
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

<div class="flex flex-col justify-center px-[10%] w-full justify-self-center gap-4 py-8">
  <h1 class="text-5xl font-bold text-center py-8"> {help}</h1>
<div class="flex flex-row justify-end items-center">
<input 
    type="search" 
    bind:value={searchQuery} 
    oninput={() => filterHelps(searchQuery)} 
    placeholder="Search help..." 
    class="shadow-md border-1 border-dark/20 rounded-lg 
    p-2 w-sm m-4 focus:border-white focus:ring-1 
    focus:ring-pink/50 focus:shadow-pink/30 focus:outline-none
     transition-all duration-300 ease-in-out justify-self-end"
/>
</div>

</div>

{#await data}

 <h2 class="text-lg font-semibold flex flex-row text-center gap-2 justify-self-center"><Loader class="animate-spin w-6 h-6" /> Loading Help... </h2>

{:then helps}

{#if filteredHelps.length > 0}  <!-- Use filteredHelps here -->
    <ul class="flex flex-col gap-8">
        {#each filteredHelps as help}  <!-- And here -->
            <li>
                <Accordion title={help.title} description={help.description} />
            </li>
        {/each}
    </ul>
{:else}
    <p class="text-center text-xl font-bold flex flex-row justify-center gap-2"><Frown class="animate-bounce w-8 h-8 text-pink" />No help articles found.</p>
{/if}
{:catch error}
    <p>Error loading help articles: {error.message}</p>
{/await}
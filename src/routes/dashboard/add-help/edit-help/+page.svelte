<script>
    let {data, form} = $props();
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { CircleAlert, CircleCheck } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

    let visible = $state(false);
    let errorVisible = $state(false);

    $effect(() => {
    if (form?.success) {
      visible = true;
      const timer = setTimeout(() => {
        visible = false;
      }, 5000);

      return () => {
        clearTimeout(timer);
      }
    }


  });
   $effect(() => {
    if (form?.error) {
     errorVisible = true;
      const timer = setTimeout(() => {
        errorVisible = false;
      }, 5000);

      return () => {
        clearTimeout(timer);
      }
    }


  });


let searchQuery = $state('');
    let filteredHelps = $derived(data.helps); // Add this

    function filterHelps(query) {
        console.log('Filtering helps with query:', query, query.length);
        if (!query) {
            filteredHelps = data.helps; // Reset to original
            return;
        }

        const queryTerms = query.trim().toLowerCase().split(/\s+/).filter(term => term.length > 0);
        if (queryTerms.length === 0) {
            filteredHelps = data.helps;
            return;
        }

        filteredHelps = data.helps.filter(help => {
            const search = `${help.title ?? ''} ${help.description ?? ''} {${help.video ?? ''}}`.toLowerCase();
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
    class="border-1 border-dark/20 rounded-lg 
    p-2 lg:w-sm m-4 fixed top-20 right-2 bg-white z-10 focus:border-white focus:ring-1 
    focus:ring-pink/50 focus:shadow-pink/30 focus:outline-none
     transition-all duration-300 ease-in-out justify-self-end"
/>
</div>

{#if visible}
  <div class="bg-green-600 w-[400px] flex flex-row flex-wrap text-white fixed top-6 z-10 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
   
    <CircleCheck class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold"> {form?.message}</h6>
   </div>
{/if}

{#if errorVisible}
  <div class="bg-red-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
    
    <CircleAlert class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold">Oops! {form?.message}.</h6>
  </div>
{/if}



<div class="flex lg:flex-row flex-col flex-wrap justify-center lg:gap-8 gap-4 items-center overflow-y-auto p-4">
    {#each filteredHelps as help}
    <SubmitButton {help} />
    {/each}
</div>
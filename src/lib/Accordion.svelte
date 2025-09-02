<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { ChevronUp } from 'lucide-svelte';
    let isOpen = $state(false);
    import { marked } from 'marked';
    let { title, description } = $props();
</script>
   
   <div class="flex flex-col lg:w-2xl justify-self-center gap-2">
   <button onclick={() => isOpen = !isOpen} 
    class="flex flex-row justify-between items-center" 
    transition:fade={{ duration: 300 }}>
    <h2 class="text-md">{title}</h2>
    <ChevronUp class="h-6 w-6 {isOpen ? '' : '-rotate-180'} transition-transform duration-600"/></button>

   {#if isOpen}
       <p transition:fly={{y: -20, duration: 300}}>{@html marked(description)}</p>
   {/if}
   </div>
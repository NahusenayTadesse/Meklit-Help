<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { ChevronUp } from 'lucide-svelte';
    let isOpen = $state(false);
    import { marked } from 'marked';
    let { title, description, video="" } = $props();
</script>
   
   <div class="flex flex-col lg:w-2xl lg:justify-self-center gap-2 px-6">
   <button onclick={() => isOpen = !isOpen} 
    class="flex flex-row justify-between lg:items-center" 
    transition:fade={{ duration: 300 }}>
    <h5 class="text-md">{title}</h5>
    <ChevronUp class="h-6 w-6 {isOpen ? '' : '-rotate-180'} transition-transform duration-600"/></button>

   {#if isOpen}
       <p transition:fly={{y: -20, duration: 300}}>{@html marked(description)}</p>
         {#if video}
           <iframe class="w-full aspect-video"
           src={video} 
           title={title}    
           frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
           picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
       {/if}
   {/if}
   </div>
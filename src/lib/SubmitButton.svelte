<script>
	import { enhance } from '$app/forms';
	import { btnFilled } from '$lib/global.svelte';
    let {help} = $props();
    import RichTextEditor from '$lib/RichTextEditor.svelte';
	import { ArrowUp, BadgeMinus, HardDriveUpload, Loader } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

     
     let loading = $state(false);
     let value = $state(help.description);
     let confirm = $state(false);
</script>

   
       <form method="POST" action="?/edit" class="lg:w-[500px] flex flex-col gap-4 p-4 shadow-2xl rounded-md mb-8" 
        use:enhance={() => {
		loading = true;

		return async ({ update }) => {
			await update({reset: false});

			loading = false;
            confirm = false;
		};
	}}

    out:fade={{ duration: 600 }}> 
            <label for="title">Help Title</label>
            <input type="text" class="border-2 border-gray-300 p-2 rounded-md w-full" name="title" value={help.title}>

            <label for="video">Video URL</label>
            <input type="text" class="border-2 border-gray-300 p-2 rounded-md w-full" name="video" value={help.video}>
            <label for="description">Description</label>
            <RichTextEditor bind:value />

           
            <input type="hidden" name="id" value={help.id}>
            <input type="hidden" name="description" bind:value>


            <div class="flex lg:flex-row justify-center flex-col gap-2 w-full">
            <button type="submit" class="{btnFilled} flex flex-row gap-2 lg:w-[150px] w-full">
            
                {#if loading}<Loader class="animate-spin" />{/if} <HardDriveUpload /> Save Edit</button>

        <button type="button" 
        class="{btnFilled} flex flex-row gap-2 !bg-red-500 text-white lg:w-[150px] w-full"
        onclick={() => confirm = !confirm}        
      > <BadgeMinus /> Delete </button>
       
            </div>

             {#if confirm}
         <div class="text-center flex flex-col gap-4 justify-center items-center"  transition:fly={{ y: -20, duration: 300 }}>Are you sure you want to delete this help article? This action cannot be undone.
            <button type="button" 
            class="{btnFilled} !bg-gray-500 lg:w-auto w-full !text-white  justify-self-center flex flex-row gap-2" 
            onclick={() => confirm = false}
            title="Cancel Delete">
             <ArrowUp class="w-6 h-6"/>
            Cancel Delete
            </button>
            <button 
            type="submit" 
            formaction="?/delete" 
            class="{btnFilled} !bg-red-500 lg:w-auto
             w-full !text-white  justify-self-center flex flex-row gap-2"
            >
             {#if loading}<Loader class="animate-spin" />{/if}
            <BadgeMinus />I am sure! Delete!</button>
            
            </div>
        {/if}
        </form>


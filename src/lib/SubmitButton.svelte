<script>
	import { enhance } from '$app/forms';
	import { btnFilled } from '$lib/global.svelte';
    let {help} = $props();
    import RichTextEditor from '$lib/RichTextEditor.svelte';
	import { BadgeMinus, HardDriveUpload, Loader } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

     
     let loading = $state(false);
     let value = $state(help.description);
</script>

   
       <form method="POST" action="?/edit" class="lg:w-[500px] flex flex-col gap-4 p-4 shadow-2xl rounded-md mb-8" 
        use:enhance={() => {
		loading = true;

		return async ({ update }) => {
			await update({reset: false});

			loading = false;
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

        
            <div class="flex flex-row gap-2  w-full">
            <button type="submit" class="{btnFilled} flex flex-row gap-2 w-[120px]">{#if loading}<Loader class="animate-spin" />{/if} <HardDriveUpload />  Save Edit</button>
            <button type="submit" formaction="?/delete" class="{btnFilled} !bg-red-500 w-[120px] !text-white flex flex-row gap-2">
            <BadgeMinus />Delete</button>
            </div>
        </form>


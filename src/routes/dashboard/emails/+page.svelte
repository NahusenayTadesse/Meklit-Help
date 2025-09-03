
<script lang="ts">
 let { form } = $props();
 import { enhance } from "$app/forms";
	import { Loader, CircleCheck,CircleAlert, SendHorizontal } from "lucide-svelte";
	import { fly } from "svelte/transition";
  import RichTextEditor from '$lib/RichTextEditor.svelte';
  let value = $state('')

    let loading = $state(false);
   import { btnFilled } from "$lib/global.svelte";

 let visible = $state(false);
 let errorVisible = $state(false);

function onsubmit(){
        loading = true;
     }
     
    $effect(() => {
    if (form?.success) {
      loading = false;
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
     loading = false;
      const timer = setTimeout(() => {
        errorVisible = false;
      }, 5000);

      return () => {
        clearTimeout(timer);
      }
    }


  });


 
</script>
<svelte:head>
    <title>Send Professional Email</title>
    <meta name="description" content="Contact form for sending emails." />
</svelte:head>
{#snippet inputs(placeholder, name, type)}
  <input {type} {name} {placeholder} required
  class="w-full p-3 mb-5 border-1 border-gray-200 rounded-md 
   bg-gray-50 text-base focus:ring-light-blue-4 focus:ring-1 focus:outline-none focus:bg-light-blue-1">
  {/snippet}
<div class="flex flex-col gap-4 overflow-y-auto">



{#if visible}
  <div class="bg-green-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
   
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

  <h3 class="text-center">Enter Your Email Messages Here</h3>
<form
    class="lg:w-1/2 w-full items-start justify-centerflex flex-col gap-4 mx-auto my-8 p-8 bg-white rounded-xl shadow-lg font-sans"
    method="POST" 
    use:enhance 
    onsubmit={onsubmit}
   >

     {@render inputs('Enter name of reciepient', 'name', 'text')}
     {@render inputs('Enter email address of reciepient', 'email', 'email')}

     {@render inputs('Subject', 'subject', 'text')}
     <RichTextEditor bind:value />
     <input type="hidden" name="message" bind:value />

    <!-- <textarea
        id="reply"
        name="message"
        rows="4"  
        required
        placeholder="Enter your messages here"
        class="w-full p- h-48  mb-6 border border-gray-200 rounded-md bg-gray-50 text-base"
    ></textarea> -->

    <button
        type="submit"
        class="{btnFilled} w-full flex flex-row justify-center items-center gap-2 mt-8"
     
    >   
       {#if loading}
        <Loader class="animate-spin" />
        {/if}

        Send Message
        <SendHorizontal />
    </button>

</form>


</div>




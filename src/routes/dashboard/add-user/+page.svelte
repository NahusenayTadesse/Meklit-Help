<script lang="ts">
 let { form } = $props();
 import { enhance } from "$app/forms";
	import { Loader, CircleCheck,CircleAlert, SendHorizontal } from "lucide-svelte";
	import { fly } from "svelte/transition";
  import {toastmsg, redmsg} from '$lib/global.svelte';

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
    <title>Add Customer Help</title>
    <meta name="description" content="Form to add new help articles and resources." />
</svelte:head>


{#snippet inputs(placeholder, name, type, required=true)}
  <input {type} {name} {placeholder} required={required}
  class="w-full p-3 mb-5 border-1 border-gray-200 rounded-md 
   bg-gray-50 text-base focus:ring-light-blue-4 focus:ring-1 focus:outline-none focus:bg-light-blue-1">
  {/snippet}
<div class="flex flex-col gap-4 overflow-y-auto">



{#if visible}
  <div class={toastmsg} transition:fly={{ x: 200, duration: 500 }}>
    <CircleCheck class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold"> {form?.message}</h6>
   </div>
{/if}

{#if errorVisible}
  <div class={redmsg} transition:fly={{ x: 200, duration: 500 }}>
    <CircleAlert class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold">Oops! {form?.message}.</h6>
  </div>
{/if}

  <h2 class="text-center">Add New User</h2>
<form
    class="lg:w-1/2 w-full items-start justify-centerflex flex-col gap-4 mx-auto my-8 p-8 bg-white rounded-xl shadow-lg font-sans"
    method="POST" 
    action="?/register"
    use:enhance 
    onsubmit={onsubmit}
   >

     {@render inputs('Enter Name of User', 'name', 'text')}

     {@render inputs('User Email', 'email', 'email')}



    <button
        type="submit"
        class="{btnFilled} w-full flex flex-row justify-center items-center gap-2 mt-8"
     
    >   
       {#if loading}  
        <Loader class="animate-spin" />
        <span class="animate-pulse">Creating User...</span>

        {:else}
        Add User
        {/if}
        <SendHorizontal />
    </button>

</form>


</div>
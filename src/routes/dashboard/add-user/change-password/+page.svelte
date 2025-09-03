<script lang="ts">
 let { form } = $props();
 import { enhance } from "$app/forms";
	import { Loader, CircleCheck,CircleAlert, SendHorizontal, Eye, EyeOff } from "lucide-svelte";
	import { fly } from "svelte/transition";

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
    if (form?.error || form?.formError || form?.passwordError || form?.mismatchError || form?.weakPasswordError) {
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

  let types = $state('password');

  function toggle(){
    if(types === 'password'){
      types = 'text';
    } else {
      types = 'password';
    }
  }

	 let EyeIcon = $derived(types === 'password' ? Eye : EyeOff);

 
</script>
<svelte:head>
    <title>Add Customer Help</title>
    <meta name="description" content="Form to add new help articles and resources." />
</svelte:head>


{#snippet inputs(placeholder, name)}
<div class="relative p-0">  
<input type={types} {name} {placeholder} required
  class="w-full p-3 mb-5 border-1 border-gray-200 rounded-md 
   bg-gray-50 text-base focus:ring-light-blue-4 focus:ring-1 focus:outline-none focus:bg-light-blue-1 transition-discrete ease-in-out duration-200">
   <button type="button" onclick={toggle} title={types === 'password' ? 'Show password' : 'Hide password'} class="absolute right-3 top-[40%] transform -translate-y-1/2">
     <EyeIcon class="text-gray-600 z-10" />
   </button>
   </div>
  {/snippet}
<div class="flex flex-col gap-4 overflow-y-auto">



{#if visible}
  <div class="bg-green-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
   
    <CircleCheck class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold"> {form?.message} {form?.formError} {form?.mismatchError} {@html form?.weakPasswordError}
    </h6>
   </div>
{/if}

{#if errorVisible}
  <div class="bg-red-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
    
    <CircleAlert class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold">Oops! {form?.message}.</h6>
  </div>
{/if}

  <h2 class="text-center">Enter Your Customer Help Here</h2>
<form
    class="lg:w-1/2 w-full items-start justify-centerflex flex-col gap-4 mx-auto my-8 p-8 bg-white rounded-xl shadow-lg font-sans"
    method="POST"
    action="?/changePassword"
    use:enhance
    onsubmit={onsubmit}
   >

     {@render inputs('Enter Your Old Password', 'currentPassword')}
     {#if form?.passwordError}
        <p class="text-red-600 text-sm mb-4">{form.passwordError}</p>
      {/if}

     {@render inputs('Enter Your New Password', 'newPassword')}

     {@render inputs('Confirm Your New Password', 'confirmNewPassword')}
     {#if form?.mismatchError}
        <p class="text-red-600 text-sm mb-4">{form.mismatchError}</p>
      {/if}
    {#if form?.formError}
        <p class="text-red-600 text-sm mb-4">{form.formError}</p>
    {/if}

    {#if form?.weakPasswordError}
        <p class="text-red-600 text-sm mb-4">{@html form.weakPasswordError}</p>
    {/if}



    <button
        type="submit"
        class="{btnFilled} w-full flex flex-row justify-center items-center gap-2 mt-8"
     
    >   
       {#if loading}  
        <Loader class="animate-spin" />
        {/if}
         {loading ? 'Changing Password...' : 'Change Password'}
        <SendHorizontal />
    </button>

</form>


</div>
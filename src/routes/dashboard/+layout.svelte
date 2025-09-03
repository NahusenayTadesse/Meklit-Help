<script>
	import { enhance } from '$app/forms';
	import { btnFilled } from '$lib/global.svelte';
	import { LogOut, Search, LayoutDashboard, Mail, UserPlus,ListPlus } from 'lucide-svelte';


    let { children } = $props();
    let pages = [
        { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard  },
        { title: 'Admin Help', url: '/dashboard/admin-help', icon: Search },
        { title: 'Email', url: '/dashboard/emails', icon: Mail },
        { title: 'Add Help', url: '/dashboard/add-help', icon: ListPlus },
        { title: 'User', url: '/dashboard/add-user', icon: UserPlus }
    ];

    let submitting = $state(false);

    function onsubmit() {
        submitting = true;
    }
</script>

<div class="lg:flex hidden min-h-screen">
    <nav class="w-56 bg-white shadow-lg  items-center text-white p-8 flex flex-col justify-between pb-24 fixed h-full">
        <div class="flex flex-col w-full">
        <ul class="list-none p-0 flex flex-col justify-start items-start">
            {#each pages as item}
                <li class="mb-5 hover:scale-110 transition-all ease-in-out duration-300">
                    <a
                        href={item.url}
                        class="text-dark no-underline text-lg transition-colors duration-200 hover:text-pink flex flex-row gap-2 items-center justify-center"
                    >
                        <item.icon class="w-5 h-5 inline-block mr-2" />
                        {item.title}
                    </a>
                </li>
            {/each}
        </ul>
        </div>

         <form method="post" action="/dashboard/?/logout" class="" use:enhance {onsubmit} >
    <button type="submit" name="logout" title="Logout" class="{btnFilled}flex text-dark flex-row gap-2 items-center justify-center text-sm w-32" disabled={submitting}>
         <LogOut class="{submitting ? 'animate-spin': ''} w-4 h-4" />
                          {submitting ? "Logging out..." : "Log Out"}

    </button>
</form>
    </nav>
    <main class="flex-1 p-8 ml-56 bg-gray-50 min-h-screen">
        {@render children()}
    </main>
</div>


<section class="lg:hidden flex flex-col p-2">

   
  <div class="pt-16 py-24 px-4">
  
   {@render children()}
   </div>

<div class="grid lg:hidden grid-cols-4 gap-1 fixed bottom-0 z-100 w-full bg-dark justify-center items-center align-center p-2">


{#each pages.slice(1) as item}
    <a href={item.url} class="flex flex-col gap-1 text-white justify-center items-center">
        <item.icon size="18" />
        <p class="text-[8px] text-white">{item.title}</p>
    </a>
  {/each}
    <!-- <form method="post" action="/dashboard/?/logout" class="col-span-1 flex justify-center items-center" use:enhance {onsubmit} >
        <button type="submit" name="logout" title="Logout" class="flex flex-col gap-1 text-white justify-center items-center" disabled={submitting}>
             <LogOut class="{submitting ? 'animate-spin': ''} w-5 h-5" />
             <p class="text-[8px] tex-white">{submitting ? "Logging out..." : "Log Out"}</p>
        </button> -->
<!-- </form> -->


</div>  
</section>
 

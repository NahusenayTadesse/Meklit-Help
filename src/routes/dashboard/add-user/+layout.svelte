<script>
	import { enhance } from '$app/forms';
    let { children } = $props();
    import { page } from '$app/state';
	import { LogOut, Plus } from 'lucide-svelte';
    let submitting = $state(false);

    function onsubmit() {
        submitting = true;
    }
    let btn = "p-2 flex flex-row gap-2 justify-center items-center rounded-lg border-1 border-dark/30 lg:w-[200px] w-3/4 justify-self-center hover:scale-110 transition-all duration-300 ease-in-out"
</script>

<div class="flex lg:flex-row flex-col gap-4 lg:flex-start justify-center items-center"> 
    <a href="/dashboard/add-user/change-password" class="{btn} {page.url.pathname === '/dashboard/add-user/change-password' ? '!bg-dark !text-white' : ''}" title="Change Your Password">Change Your Password</a>
    <a href="/dashboard/add-user/" class="{btn} {page.url.pathname === '/dashboard/add-user' ? '!bg-dark !text-white' : ''}" title="Add New User">
        <Plus class="w-4 h-4" />Add New User</a>
    <form method="post" action="/dashboard/?/logout" class="{btn}" use:enhance {onsubmit} >
        <button type="submit" name="logout" title="Logout" class="flex flex-row gap-2  justify-center items-center" disabled={submitting}>
             <LogOut class="{submitting ? 'animate-spin': ''} w-5 h-5" />
             <p class="text-[8px] text-dark">{submitting ? "Logging out..." : "Log Out"}</p>
        </button>
    </form>
</div>
<div class="pt-4">
{@render children()}
</div>
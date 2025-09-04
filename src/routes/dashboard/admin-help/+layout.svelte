<script>
    let { children } = $props();
    import { page } from '$app/state';
    let btn = "p-2 flex flex-row gap-4 justify-center items-center rounded-lg border-1 border-dark/30 w-[150px] hover:scale-110 transition-all duration-300 ease-in-out"
</script>

<div class="lg:flex lg:flex-row gap-2 lg:flex-start grid grid-cols-2 justify-center items-center p-4"> 
    <a href="/dashboard/admin-help/add-admin-help"  class="{btn} {page.url.pathname === '/dashboard/admin-help/add-admin-help' ? 'bg-dark text-white' : ''}">Add Admin Help</a>
    <a href="/dashboard/admin-help/add-admin-help/edit-admin-help" class="{btn} {page.url.pathname === '/dashboard/admin-help/add-admin-help/edit-admin-help' ? '!bg-dark !text-white' : ''}">Edit Admin Help</a>
</div>
<div class="pt-4">
    {@render children()}
</div>
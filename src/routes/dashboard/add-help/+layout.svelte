<script>
    let { children } = $props();
    import { page } from '$app/state';
    let btn = "p-2 flex flex-row gap-4 justify-center items-center rounded-lg border-1 border-dark/30 w-[150px] hover:scale-110 transition-all duration-300 ease-in-out"
</script>

<div class="flex flex-row gap-2 flex-start"> 
    <a href="/dashboard/add-help/add-vendor-help"  class="{btn} {page.url.pathname === '/dashboard/add-help/add-vendor-help' ? 'bg-dark text-white' : ''}">Add Vendor Help</a>
    <a href="/dashboard/add-help/" class="{btn} {page.url.pathname === '/dashboard/add-help' ? '!bg-dark !text-white' : ''}">Add Help</a>
    <a href="/dashboard/add-help/edit-help" class="{btn} {page.url.pathname === '/dashboard/add-help/edit-help' ? '!bg-dark !text-white' : ''}">Edit Help</a>
</div>
<div class="pt-4">
    {@render children()}
</div>
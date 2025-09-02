<script>
    let { data, children } = $props();
    let pages = [
        { title: 'Admin Help', url: '/dashboard/admin-help' },
        { title: 'Email', url: '/dashboard/emails' },
        { title: 'Add Help', url: '/dashboard/add-help' },
    ];
</script>

<div class="flex min-h-screen">
    <nav class="w-56 bg-white shadow-lg text-white p-8  fixed h-full">
        <h2 class="mb-8 text-2xl font-bold text-dark">Dashboard</h2>
        <ul class="list-none p-0">
            {#each pages as { title, url }}
                <li class="mb-5 hover:scale-110 transition-all ease-in-out duration-300">
                    <a
                        href={url}
                        class="text-dark no-underline text-lg transition-colors duration-200 hover:text-pink"
                    >
                        {title}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
    <main class="flex-1 p-8">
        {@render children()}
    </main>
</div>

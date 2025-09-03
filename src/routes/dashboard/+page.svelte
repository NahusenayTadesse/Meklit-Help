<script>

    let {data} = $props();

</script>

<svelte:head>
    <title>Dashboard</title>
    <meta name="description" content="User dashboard with quick access to features." />
</svelte:head>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:mt-8 mt-0">
    <!-- Welcome Card -->
    <div class="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center animate-fade-in hover:scale-105 transition-transform duration-300">
        <h2 class="text-2xl font-bold text-white mb-2">Welcome {data.user[0].name}!</h2>
        <p class="text-white text-center">Glad to see you back. Explore your dashboard and manage your tasks efficiently.</p>
    </div>

    <!-- Email Card -->
    <a href="/dashboard/emails" class="bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-400 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center animate-fade-in hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
        <h2 class="text-2xl font-bold text-white mb-2">Send a Professional Email</h2>
        <p class="text-white text-center">Send a styled and formatted email directly from your dashboard.</p>
    </a>

    <!-- Admin Help Card -->
    <a href="/dashboard/admin-help" class="bg-gradient-to-br from-green-500 via-lime-400 to-yellow-300 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center animate-fade-in hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
        <h2 class="text-2xl font-bold text-white mb-2">Admin Help</h2>
        <p class="text-white text-center">Need assistance? Checkout our admin help guide.</p>
    </a>

    <!-- User Profile Card -->
    <a href="/dashboard/user" class="bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-300 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center animate-fade-in hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
        <h2 class="text-2xl font-bold text-white mb-2">Your Profile</h2>
        <p class="text-white text-center">Add new users and update your password.</p>
    </a>

    <a href="/dashboard/add-help" class="bg-gradient-to-br from-green-500 via-blue-400 to-pink rounded-xl shadow-lg p-8 flex flex-col items-center justify-center animate-fade-in hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
        <h2 class="text-2xl font-bold text-white mb-2">Add Help</h2>
        <p class="text-white text-center">Create new help articles and resources for users.</p>
    </a>

    <a href="/dashboard/add-help/edit-help" class="bg-gradient-to-br from-dark via-pink to-red-500 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center animate-fade-in hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
        <h2 class="text-2xl font-bold text-white mb-2">Edit Help</h2>
        <p class="text-white text-center">Modify existing help articles and resources.</p>
    </a>
</div>

<style>
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px);}
        to { opacity: 1; transform: translateY(0);}
    }
    .animate-fade-in {
        animation: fade-in 0.8s ease;
    }
</style>
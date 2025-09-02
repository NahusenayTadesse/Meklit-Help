<script lang="ts">
	import { enhance } from '$app/forms';
	import { LogIn } from 'lucide-svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let input =  `shadow-md border-1 border-dark/20 rounded-lg 
    p-2 w-sm focus:border-white focus:ring-1 
    focus:ring-pink/50 focus:shadow-pink/30 focus:outline-none
     transition-all duration-300 ease-in-out`
</script>

<div class="min-h-screen flex items-center justify-center ">
	<div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
		<img src="/Logo.webp" alt="ByMelkit Logo">
		<h1 class="text-3xl font-bold text-center text-dark mb-6 tracking-tight">Login</h1>
		<form method="post" action="?/login"
			class="flex flex-col gap-6"
			use:enhance>
			<p style="color: red">{form?.message ?? ''}</p>

			<label class="flex flex-col text-gray-700 font-medium">
				<span class="mb-1">Username or email</span>
				<input
					name="username"
					autocomplete="username"
           class={input}				/>
			</label>
			<label class="flex flex-col text-gray-700 font-medium">
				<span class="mb-1">Password</span>
				<input
					type="password"
					name="password"
					autocomplete="current-password"
					class={input}
				/>
			</label>
			<div class="flex gap-4 mt-4">
				<button
					class="flex flex-row gap-2 w-full justify-center items-center
					rounded-lg bg-transparent backdrop-blur-lg px-4 py-2 font-semibold text-dark 
					shadow-lg border-1 border-dark/20 transition  
					hover:scale-110 hover:shadow-pink/20"
				>
					Login <LogIn />
				</button>
				<!-- <button
					formaction="?/register"
					class="flex-1 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 font-semibold text-white shadow transition hover:from-green-500 hover:to-blue-600 hover:scale-105 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
				>
					Register
				</button> -->
			</div>
		</form>
	</div>
</div>

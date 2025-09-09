<script>
	import HealthCheckForm from '$lib/components/forms/HealthCheckForm.svelte';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Free IT Health Check - J²it: IT and Web Solutions</title>
	<meta
		name="description"
		content="Get your free IT health check from J²it. Discover hidden risks, unnecessary costs, and simple fixes that could save your business time and money."
	/>
</svelte:head>

{#if mounted}
	<div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
		<!-- Background effects -->
		<div class="fixed inset-0 overflow-hidden pointer-events-none">
			<div
				class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#4dd36f]/10 to-transparent rounded-full blur-3xl"
				in:fade={{ duration: 2000, delay: 100 }}
			></div>
			<div
				class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#4dd3ff]/10 to-transparent rounded-full blur-3xl"
				in:fade={{ duration: 2000, delay: 300 }}
			></div>
		</div>

		<div class="relative z-10" in:fly={{ y: 20, duration: 600 }}>
			<HealthCheckForm />
		</div>
	</div>
{/if}

<style>
	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
	}
</style>

<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	$: status = $page.status;
	$: message = $page.error?.message || 'Something went wrong';
</script>

<svelte:head>
	<title>{status} - J²IT Solutions</title>
	<meta name="description" content="Page not found - J²IT IT and Web Solutions" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center relative overflow-hidden">
	<!-- Background gradient -->
	<div class="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]"></div>

	<!-- Floating glows -->
	<div
		class="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-radial from-[#4dd36f]/20 to-transparent blur-[80px] opacity-50"
	></div>
	<div
		class="absolute bottom-[30%] right-[15%] w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#4dd3ff]/20 to-transparent blur-[100px] opacity-50"
	></div>

	<div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
		<!-- Error Icon -->
		<div class="mb-8">
			<div
				class="w-24 h-24 bg-gradient-to-br from-[#4dd3ff] to-[#4dd36f] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"
			>
				<Icon icon="heroicons:exclamation-triangle" class="w-12 h-12 text-white" />
			</div>
		</div>

		<!-- Error Code -->
		<h1 class="text-8xl sm:text-9xl font-bold mb-4 gradient-text">
			{status}
		</h1>

		<!-- Error Message -->
		<h2 class="text-2xl sm:text-3xl font-bold mb-6">
			{#if status === 404}
				Page Not Found
			{:else if status === 500}
				Server Error
			{:else}
				Oops! Something went wrong
			{/if}
		</h2>

		<p class="text-xl text-white/70 mb-8 max-w-md mx-auto">
			{#if status === 404}
				The page you're looking for doesn't exist or has been moved.
			{:else if status === 500}
				We're experiencing technical difficulties. Please try again later.
			{:else}
				{message}
			{/if}
		</p>

		<!-- Action Buttons -->
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="/" class="btn-primary inline-flex items-center gap-3">
				<Icon icon="heroicons:home" class="w-6 h-6" />
				Go Home
			</a>
			<a href="/contact" class="btn-secondary inline-flex items-center gap-3">
				<Icon icon="heroicons:chat-bubble-left-ellipsis" class="w-6 h-6" />
				Get Help
			</a>
		</div>

		<!-- Additional Help -->
		<div class="mt-12 p-6 bg-[#1a1a2e]/50 rounded-2xl backdrop-blur-sm border border-white/10">
			<h3 class="text-lg font-semibold mb-4">Need IT Support?</h3>
			<p class="text-white/70 mb-4">
				Even when things go wrong online, your business IT doesn't have to.
			</p>
			<a
				href="/health-check"
				class="text-[#4dd3ff] hover:text-[#4dd36f] transition-colors font-semibold"
			>
				Get your free IT health check →
			</a>
		</div>
	</div>
</div>

<style>
	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
	}
</style>

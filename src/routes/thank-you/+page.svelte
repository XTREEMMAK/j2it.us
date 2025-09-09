<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import confetti from 'canvas-confetti';

	let mounted = false;
	let formType = '';

	onMount(() => {
		mounted = true;
		formType = $page.url.searchParams.get('type') || 'contact';

		// Trigger confetti animation
		setTimeout(() => {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
				colors: ['#4dd3ff', '#4dd36f', '#ff4d8f']
			});
		}, 500);
	});

	$: isHealthCheck = formType === 'health-check';
	$: isContact = formType === 'contact';
</script>

<svelte:head>
	<title>Thank You - J²it: IT and Web Solutions</title>
	<meta
		name="description"
		content="Thank you for contacting J²it. We'll be in touch soon to help with your IT needs."
	/>
</svelte:head>

{#if mounted}
	<div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
		<!-- Background effects -->
		<div class="fixed inset-0 overflow-hidden pointer-events-none">
			<div
				class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#4dd36f]/20 to-transparent rounded-full blur-3xl animate-pulse"
			></div>
			<div
				class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#4dd3ff]/20 to-transparent rounded-full blur-3xl animate-pulse"
				style="animation-delay: 1s;"
			></div>
		</div>

		<div class="relative z-10 max-w-3xl mx-auto text-center">
			<!-- Success Icon -->
			<div
				class="w-24 h-24 bg-gradient-to-br from-[#4dd36f] to-[#3fb55f] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
				in:fly={{ y: -20, duration: 600, delay: 100 }}
			>
				<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>

			<!-- Main Message -->
			<div in:fly={{ y: 20, duration: 600, delay: 200 }}>
				<h1 class="text-4xl sm:text-5xl font-bold mb-6">
					{#if isHealthCheck}
						Your IT Health Check Request is Confirmed!
					{:else}
						Thank You for Reaching Out!
					{/if}
				</h1>

				<p class="text-xl text-white/80 mb-8">
					{#if isHealthCheck}
						I've received your IT health check request and will personally review your information.
					{:else}
						Your message has been received and I'll get back to you soon.
					{/if}
				</p>
			</div>

			<!-- What's Next -->
			<div class="bg-[#1a1a2e] rounded-2xl p-8 mb-8" in:fade={{ duration: 600, delay: 400 }}>
				<h2 class="text-2xl font-bold mb-6 gradient-text">What Happens Next?</h2>

				<div class="grid md:grid-cols-2 gap-6 text-left">
					<div class="flex items-start gap-4">
						<div
							class="w-8 h-8 bg-gradient-to-br from-[#4dd3ff] to-[#4dd36f] rounded-full flex items-center justify-center flex-shrink-0 mt-1"
						>
							<span class="text-white font-bold text-sm">1</span>
						</div>
						<div>
							<h3 class="font-semibold mb-2">Personal Review</h3>
							<p class="text-white/70 text-sm">
								{#if isHealthCheck}
									I'll personally review your business details and IT setup to prepare tailored
									recommendations.
								{:else}
									I'll review your message and prepare a personalized response based on your
									specific needs.
								{/if}
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="w-8 h-8 bg-gradient-to-br from-[#4dd36f] to-[#ff4d8f] rounded-full flex items-center justify-center flex-shrink-0 mt-1"
						>
							<span class="text-white font-bold text-sm">2</span>
						</div>
						<div>
							<h3 class="font-semibold mb-2">Quick Response</h3>
							<p class="text-white/70 text-sm">
								You'll hear from me within 24 hours (usually much sooner) to discuss your IT needs
								and next steps.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="w-8 h-8 bg-gradient-to-br from-[#ff4d8f] to-[#FFCC70] rounded-full flex items-center justify-center flex-shrink-0 mt-1"
						>
							<span class="text-white font-bold text-sm">3</span>
						</div>
						<div>
							<h3 class="font-semibold mb-2">
								{#if isHealthCheck}
									Free Assessment
								{:else}
									Consultation
								{/if}
							</h3>
							<p class="text-white/70 text-sm">
								{#if isHealthCheck}
									We'll schedule your free 15-minute IT health check to identify risks and
									opportunities.
								{:else}
									We'll discuss how I can help solve your IT challenges and support your business
									goals.
								{/if}
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="w-8 h-8 bg-gradient-to-br from-[#FFCC70] to-[#4dd3ff] rounded-full flex items-center justify-center flex-shrink-0 mt-1"
						>
							<span class="text-white font-bold text-sm">4</span>
						</div>
						<div>
							<h3 class="font-semibold mb-2">Action Plan</h3>
							<p class="text-white/70 text-sm">
								{#if isHealthCheck}
									You'll receive a clear action plan with recommendations, priorities, and
									transparent pricing.
								{:else}
									If we're a good fit, I'll provide a clear proposal for how we can work together.
								{/if}
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Additional Actions -->
			<div in:fade={{ duration: 600, delay: 500 }}>
				<h3 class="text-xl font-semibold mb-4">In the Meantime</h3>
				<p class="text-white/70 mb-6">
					Feel free to explore more about how I can help your business:
				</p>

				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a href="/services" class="btn-secondary"> View All Services </a>
					<a href="/" class="btn-secondary"> Back to Home </a>
					{#if !isHealthCheck}
						<a href="/health-check" class="btn-primary"> Get Free IT Health Check </a>
					{/if}
				</div>
			</div>

			<!-- Contact Info -->
			<div class="mt-12 pt-8 border-t border-white/10" in:fade={{ duration: 600, delay: 600 }}>
				<p class="text-white/60 text-sm mb-4">
					Need immediate assistance? Feel free to reach out directly:
				</p>
				<a
					href="mailto:contact@j2it.us"
					class="text-[#4dd3ff] hover:text-[#4dd36f] transition-colors"
				>
					contact@j2it.us
				</a>
			</div>
		</div>
	</div>
{/if}

<style>
	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
	}
</style>

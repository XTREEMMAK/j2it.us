<script>
	import { fly, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { currentSection, scrollDirection } from '$lib/stores/sectionScroll.js';
	import { createSectionAnimation } from '$lib/utils/sectionAnimations.js';
	import { scheduleCallEnabled } from '$lib/stores/features.js';
	import Icon from '@iconify/svelte';

	$: visible = $currentSection === 3 || $currentSection === -1; // Show on mobile when currentSection is -1
	let cardsVisible = false;
	let headerVisible = false;
	let ctaVisible = false;
	let bottomCtaVisible = false;
	let hideTimeout = null;
	let showTimeouts = [];

	// On mobile, show everything immediately
	$: if ($currentSection === -1) {
		cardsVisible = true;
		headerVisible = true;
		ctaVisible = true;
		bottomCtaVisible = true;
	}

	// Desktop: Reset states when section becomes invisible with delay for out animations
	$: if (
		$currentSection !== -1 &&
		!visible &&
		(cardsVisible || headerVisible || ctaVisible || bottomCtaVisible)
	) {
		// Clear any show timeouts
		showTimeouts.forEach((t) => clearTimeout(t));
		showTimeouts = [];

		// Don't reset if we're already hiding
		if (!hideTimeout) {
			hideTimeout = setTimeout(() => {
				cardsVisible = false;
				headerVisible = false;
				ctaVisible = false;
				bottomCtaVisible = false;
				hideTimeout = null;
			}, 500); // Slightly longer to ensure animations complete
		}
	}

	// Desktop: Sequential delays when section becomes visible
	$: if ($currentSection !== -1 && visible) {
		// Clear any hide timeout if we're showing again
		if (hideTimeout) {
			clearTimeout(hideTimeout);
			hideTimeout = null;
		}

		if (!headerVisible) {
			const t1 = setTimeout(() => {
				headerVisible = true;
			}, 200);
			showTimeouts.push(t1);
		}

		if (!ctaVisible) {
			const t2 = setTimeout(() => {
				ctaVisible = true;
			}, 500);
			showTimeouts.push(t2);
		}

		if (!cardsVisible) {
			const t3 = setTimeout(() => {
				cardsVisible = true;
			}, 800);
			showTimeouts.push(t3);
		}

		if (!bottomCtaVisible) {
			const t4 = setTimeout(() => {
				bottomCtaVisible = true;
			}, 1400);
			showTimeouts.push(t4);
		}
	}

	$: animations = {
		header: createSectionAnimation($scrollDirection, 'default'),
		cta: createSectionAnimation($scrollDirection, 'default'),
		cards: createSectionAnimation($scrollDirection, 'stagger')
	};

	const processSteps = [
		{
			number: '1',
			title: 'Free Assessment',
			description: "I'll check your current setup and identify your needs and risks",
			color: 'from-[#4dd36f] to-[#3fb55f]',
			delay: 0
		},
		{
			number: '2',
			title: 'Simple Setup',
			description: 'Quick installation of monitoring tools',
			color: 'from-[#4dd3ff] to-[#4158D0]',
			delay: 200
		},
		{
			number: '3',
			title: 'Ongoing Peace of Mind',
			description: 'Flat monthly rate, reliable support',
			color: 'from-[#ff4d8f] to-[#C850C0]',
			delay: 400
		}
	];
</script>

<section
	id="how-it-works"
	class="relative h-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
	<!-- Background gradient -->
	<div class="absolute inset-0 bg-gradient-to-b from-[#12121a] to-[#1a1a2e]"></div>

	<!-- Floating glows -->
	<div
		class="absolute top-[30%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#4dd36f]/20 to-transparent blur-[100px] opacity-50"
	></div>
	<div
		class="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#4dd3ff]/20 to-transparent blur-[100px] opacity-50"
	></div>

	<div
		class="relative z-10 max-w-7xl mx-auto transition-all duration-500"
		style="opacity: {visible ? 1 : 0}; visibility: {visible ? 'visible' : 'hidden'};"
	>
		<!-- Section title -->
		<div class="text-center mb-12 min-h-[120px]">
			<h2
				class="text-3xl sm:text-4xl font-bold mb-4 transition-all duration-500"
				style="opacity: {headerVisible ? 1 : 0}; transform: translateY({headerVisible ? 0 : 30}px);"
			>
				How This Works
			</h2>
			<p
				class="text-xl text-white/70 max-w-2xl mx-auto transition-all duration-500"
				style="opacity: {headerVisible ? 1 : 0}; transform: translateY({headerVisible
					? 0
					: 30}px); transition-delay: 100ms;"
			>
				Simple, transparent IT support in three easy steps
			</p>
		</div>

		<!-- CTA Section -->
		<div class="text-center mb-16 min-h-[200px]">
			<h3
				class="text-2xl sm:text-3xl font-bold mb-6 transition-all duration-500"
				style="opacity: {ctaVisible ? 1 : 0}; transform: translateY({ctaVisible ? 0 : 30}px);"
			>
				Stop Fighting with<br />Technology
			</h3>
			<div
				class="flex flex-col sm:flex-row gap-4 justify-center transition-all duration-500"
				style="opacity: {ctaVisible ? 1 : 0}; transform: translateY({ctaVisible
					? 0
					: 30}px); transition-delay: 150ms;"
			>
				<a href="/health-check" class="btn-primary inline-flex items-center gap-3">
					<Icon icon="heroicons:check-circle" class="w-7 h-7" />
					Get Your Free IT Health Check
				</a>
				{#if $scheduleCallEnabled}
					<a href="/contact#schedule" class="btn-secondary inline-flex items-center gap-3">
						<Icon icon="heroicons:calendar-days" class="w-7 h-7" />
						Or schedule a quick call
					</a>
				{/if}
			</div>
		</div>

		<!-- Process cards -->
		<div class="process-cards-grid grid md:grid-cols-3 gap-8 min-h-[300px]">
			{#each processSteps as step, i}
				<div
					class="process-card relative group {cardsVisible ? 'visible' : ''}"
					style="transition-delay: {cardsVisible ? i * 200 : 0}ms;"
				>
					<!-- Animated gradient border -->
					<div
						class="absolute -inset-1 bg-gradient-to-br {step.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300"
						style="animation-delay: {i * 1.3}s"
					></div>

					<!-- Static gradient border -->
					<div
						class="absolute -inset-[2px] bg-gradient-to-br {step.color} rounded-2xl opacity-60 animate-[gradient-rotate_4s_ease_infinite]"
						style="animation-delay: {i * 1.3}s"
					></div>

					<!-- Card content -->
					<div class="relative bg-[#0b090a] rounded-2xl p-10 text-center h-full">
						<!-- Number -->
						<div
							class="font-bold mb-6 gradient-text-custom"
							style="font-size: 6rem; background: linear-gradient(135deg, var(--color-from), var(--color-to)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; --color-from: {step.color.includes(
								'4dd36f'
							)
								? '#4dd36f'
								: step.color.includes('4dd3ff')
									? '#4dd3ff'
									: '#ff4d8f'}; --color-to: {step.color.includes('3fb55f')
								? '#3fb55f'
								: step.color.includes('4158D0')
									? '#4158D0'
									: '#C850C0'};"
						>
							{step.number}
						</div>

						<!-- Title -->
						<h4 class="text-2xl font-semibold mb-3">
							{step.title}
						</h4>

						<!-- Description -->
						<p class="text-white/70">
							{step.description}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Bottom CTA -->
		<div class="text-center mt-16 min-h-[150px]">
			<p
				class="text-2xl text-white/70 mb-8 transition-all duration-500"
				style="opacity: {bottomCtaVisible ? 1 : 0}; transform: translateY({bottomCtaVisible
					? 0
					: 30}px);"
			>
				Ready to stop worrying about IT and focus on your business?
			</p>
			<br />
			<a
				href="/contact"
				class="btn-primary text-xl px-10 py-5 inline-flex items-center gap-3 transition-all duration-500"
				style="opacity: {bottomCtaVisible ? 1 : 0}; transform: translateY({bottomCtaVisible
					? 0
					: 30}px); transition-delay: 150ms;"
			>
				<Icon icon="heroicons:arrow-right" class="w-8 h-8" />
				Get Started Today
			</a>
		</div>
	</div>
</section>

<style>
	.process-card {
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.6s ease;
	}

	.process-card.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.process-card:hover {
		transform: translateY(-10px) scale(1.03) !important;
	}

	.process-card:hover .gradient-text-custom {
		filter: drop-shadow(0 0 20px currentColor) drop-shadow(0 0 40px currentColor);
		animation: number-glow 2s ease-in-out infinite alternate;
	}

	@keyframes number-glow {
		0% {
			filter: drop-shadow(0 0 20px currentColor) drop-shadow(0 0 40px currentColor);
		}
		100% {
			filter: drop-shadow(0 0 30px currentColor) drop-shadow(0 0 60px currentColor)
				drop-shadow(0 0 80px currentColor);
		}
	}

	.process-card:hover .gradient-border {
		opacity: 1;
	}

	@keyframes gradient-rotate {
		0% {
			background-position: 0% 50%;
			opacity: 0.6;
		}
		50% {
			background-position: 100% 50%;
			opacity: 0.8;
		}
		100% {
			background-position: 0% 50%;
			opacity: 0.6;
		}
	}

	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
	}

	/* Mobile optimizations */
	@media (max-width: 769px) {
		/* Remove padding from section to preserve background */
		section {
			padding: 0 !important;
			overflow: visible !important; /* Allow content to expand naturally */
			min-height: 100vh !important; /* Ensure minimum viewport height */
		}

		/* Add padding to inner container */
		section > div {
			padding: 5rem 1.5rem 2rem 1.5rem !important;
			overflow: visible !important; /* Allow content to expand naturally */
		}

		/* Prevent horizontal overflow on mobile only */
		section,
		.max-w-7xl {
			overflow-x: hidden !important; /* Prevent horizontal scroll only */
			max-width: 100% !important;
		}

		/* Adjust grid for mobile */
		.process-cards-grid {
			grid-template-columns: 1fr !important;
			gap: 1.5rem !important;
		}

		/* Better mobile text spacing */
		h2 {
			font-size: 2.5rem !important;
			line-height: 1.2 !important;
		}

		h3 {
			font-size: 2rem !important;
			line-height: 1.2 !important;
		}
	}
</style>

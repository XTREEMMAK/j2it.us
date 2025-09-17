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
			title: 'Free Cost Analysis',
			description: "Discover what IT problems are costing you and how much you can save",
			color: 'from-[#4dd36f] to-[#3fb55f]',
			delay: 0
		},
		{
			number: '2',
			title: 'Quick Setup',
			description: 'Start saving money immediately with proactive monitoring',
			color: 'from-[#4dd3ff] to-[#4158D0]',
			delay: 200
		},
		{
			number: '3',
			title: 'See ROI Fast',
			description: 'Most clients save money in the first month alone',
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
				Stop overpaying for IT - here's how we make it affordable
			</p>
		</div>

		<!-- CTA Section -->
		<div class="text-center mb-16 min-h-[200px]">
			<h3
				class="text-2xl sm:text-3xl font-bold mb-6 transition-all duration-500"
				style="opacity: {ctaVisible ? 1 : 0}; transform: translateY({ctaVisible ? 0 : 30}px);"
			>
				Your Current IT Approach<br />Is Costing You Money
			</h3>
			<div
				class="flex flex-col sm:flex-row gap-4 justify-center transition-all duration-500"
				style="opacity: {ctaVisible ? 1 : 0}; transform: translateY({ctaVisible
					? 0
					: 30}px); transition-delay: 150ms;"
			>
				<a href="/health-check" class="btn-primary inline-flex items-center gap-3">
					<Icon icon="heroicons:check-circle" class="w-7 h-7" />
					Find Out How Much You Can Save
				</a>
				{#if $scheduleCallEnabled}
					<a href="/contact#schedule" class="btn-secondary inline-flex items-center gap-3">
						<Icon icon="heroicons:calendar-days" class="w-7 h-7" />
						Get your custom cost analysis
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
				Ready for IT support that just works?
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

	/* Match title sizes across all sections at intermediate resolutions */
	@media (min-width: 961px) and (max-width: 1400px) and (min-height: 800px) and (max-height: 1100px) {
		#how-it-works h2,
		#how-it-works h2[class*="text-3xl"] {
			font-size: 3rem !important;
			line-height: 1.2 !important;
			font-weight: 700 !important;
			margin-bottom: 1rem !important;
		}
	}

	/* Mobile optimizations with scrolling for edge cases - high specificity */
	/* Intermediate desktop resolution fixes */
	@media (min-width: 961px) and (max-width: 1400px) and (min-height: 800px) and (max-height: 1100px) {
		section {
			padding: 40px 20px !important;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			min-height: auto !important;
		}

		.relative.z-10.max-w-7xl {
			margin-top: 0;
			padding: 0;
		}

		/* Title scaling - match other section titles */
		h2 {
			font-size: 3rem !important;
			line-height: 1.2 !important;
			margin-bottom: 1rem !important;
			font-weight: 700 !important;
		}

		h3 {
			font-size: 1.75rem !important;
			margin-bottom: 1rem !important;
		}

		/* Step cards grid */
		.grid.lg\\:grid-cols-3 {
			grid-template-columns: repeat(3, 1fr) !important;
			gap: 1.5rem !important;
		}

		/* CTA section */
		.text-2xl {
			font-size: 1.5rem !important;
		}

		.text-xl {
			font-size: 1.25rem !important;
		}
	}

	/* Desktop with shorter heights */
	@media (min-width: 770px) and (max-height: 950px) {
		section {
			padding: 20px !important;
		}

		h2 {
			font-size: 1.75rem !important;
			margin-bottom: 0.75rem !important;
		}

		h3 {
			font-size: 1.5rem !important;
			margin-bottom: 0.75rem !important;
		}

		.grid.lg\\:grid-cols-3 {
			gap: 1rem !important;
		}

		.text-2xl {
			font-size: 1.25rem !important;
		}

		.text-xl {
			font-size: 1.125rem !important;
		}
	}

	/* Very short heights */
	@media (min-width: 770px) and (max-height: 800px) {
		section {
			padding: 10px !important;
		}

		h2 {
			font-size: 1.5rem !important;
			margin-bottom: 0.5rem !important;
		}

		h3 {
			font-size: 1.25rem !important;
			margin-bottom: 0.5rem !important;
		}

		.grid.lg\\:grid-cols-3 {
			grid-template-columns: repeat(2, 1fr) !important;
			gap: 0.75rem !important;
		}

		.text-2xl {
			font-size: 1.125rem !important;
		}

		.text-xl {
			font-size: 1rem !important;
		}
	}

	@media (max-width: 768px) {
		/* Remove padding from section to preserve background and allow natural flow */
		#how-it-works.relative.h-full {
			height: auto !important; /* Remove h-full constraint on mobile */
			padding: 0 !important;
			overflow: visible !important; /* Allow content to expand naturally */
			min-height: auto !important; /* Remove viewport height constraints */
			/* Fix vertical centering that crops content on short viewports */
			display: block !important; /* Override flex layout */
			align-items: flex-start !important; /* Prevent vertical centering */
		}

		/* Add padding to inner container and remove all height constraints */
		#how-it-works > div {
			padding: 5rem 1.5rem 2rem 1.5rem !important;
			overflow: visible !important; /* Allow content to expand naturally */
			height: auto !important;
			min-height: auto !important;
		}

		/* Remove height constraints from all containers */
		#how-it-works section > div > div,
		#how-it-works .relative.z-10,
		#how-it-works .max-w-7xl {
			height: auto !important;
			min-height: auto !important;
			max-height: none !important;
		}

		/* Prevent horizontal overflow on mobile only */
		section,
		.max-w-7xl {
			overflow-x: hidden !important; /* Prevent horizontal scroll only */
			max-width: 100% !important;
		}

		/* Remove ALL height constraints from content areas including min-h-[] classes */
		.text-center,
		.process-cards-grid,
		.process-card,
		div[class*="min-h-["],
		.text-center[class*="min-h-["] {
			min-height: auto !important;
			height: auto !important;
			max-height: none !important;
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

<script>
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { currentSection, scrollDirection } from '$lib/stores/sectionScroll.js';
	import { createSectionAnimation } from '$lib/utils/sectionAnimations.js';
	import { scheduleCallEnabled } from '$lib/stores/features.js';
	import Icon from '@iconify/svelte';

	$: visible = $currentSection === 2 || $currentSection === -1; // Show on mobile when currentSection is -1
	let cardsVisible = false;
	let textVisible = false;
	let hideTimeout = null;
	let showTimeouts = [];

	// On mobile, show everything immediately
	$: if ($currentSection === -1) {
		textVisible = true;
		cardsVisible = true;
	}

	// Desktop: Reset states when section becomes invisible with delay for out animations
	$: if ($currentSection !== -1 && !visible && (cardsVisible || textVisible)) {
		// Clear any show timeouts
		showTimeouts.forEach((t) => clearTimeout(t));
		showTimeouts = [];

		// Don't reset if we're already hiding
		if (!hideTimeout) {
			hideTimeout = setTimeout(() => {
				cardsVisible = false;
				textVisible = false;
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

		if (!textVisible) {
			const t1 = setTimeout(() => {
				textVisible = true;
			}, 100);
			showTimeouts.push(t1);
		}

		if (!cardsVisible) {
			const t2 = setTimeout(() => {
				cardsVisible = true;
			}, 300);
			showTimeouts.push(t2);
		}
	}

	$: animations = {
		content: createSectionAnimation($scrollDirection, 'default'),
		stagger: createSectionAnimation($scrollDirection, 'stagger'),
		pricing: createSectionAnimation($scrollDirection, 'scale')
	};

	const features = [
		'Perfect for businesses with 4-10 computers who need enterprise protection',
		'Save thousands compared to hiring a full-time IT person ($50K+ salary)',
		'Stop paying $150-200/hour for emergency IT support calls',
		'No more lost productivity from computer problems (worth $1000s/month)',
		'Predictable IT budget - no surprise bills or hidden fees'
	];

	const serviceCards = [
		{
			icon: 'heroicons:shield-check',
			title: 'Security<br>Protection',
			description: 'Remote monitoring',
			gradient: 'from-[#4158D0] to-[#C850C0]'
		},
		{
			icon: 'heroicons:bolt',
			title: 'Backup<br>Monitoring',
			description: 'System monitoring',
			gradient: 'from-[#4dd36f] to-[#3fb55f]'
		},
		{
			icon: 'heroicons:arrow-up-circle',
			title: 'Software<br>Updates',
			description: 'Monthly reports',
			gradient: 'from-[#ff4d8f] to-[#FFCC70]'
		}
	];
</script>

<section
	id="what-you-get"
	class="relative h-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
	<div class="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#120f1a]"></div>

	{#if visible}
		<div class="relative z-10 max-w-7xl mx-auto">
			<div class="grid lg:grid-cols-2 gap-12 items-start">
				<!-- Left side - Features list -->
				<div>
					<h2
						class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 transition-all duration-500"
						style="opacity: {textVisible
							? 1
							: 0}; transform: translate3d(0, 0, 0) scale({textVisible
							? 1
							: 0.95}); will-change: transform, opacity;"
					>
						The Smart Investment That Pays for Itself
					</h2>

					<div class="space-y-2 sm:space-y-3 md:space-y-4">
						{#each features as feature, i}
							<div
								class="flex items-start gap-3 transition-all duration-500"
								style="opacity: {textVisible
									? 1
									: 0}; transform: translate3d(0, 0, 0) scale({textVisible
									? 1
									: 0.95}); transition-delay: {200 + i * 100}ms; will-change: transform, opacity;"
							>
								<span
									class="text-[#4dd36f] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-0.5 sm:mt-1"
									>✓</span
								>
								<p
									class="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl text-white/80 leading-tight sm:leading-normal"
								>
									{feature}
								</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Right side - Service cards and pricing -->
				<div class="relative">
					<!-- Background glow positioned behind pricing card with fixed position -->
					<div
						class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-[#4dd3ff]/20 via-[#4dd36f]/15 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none -z-10"
						style="transform: translate(40px, 80px);"
					></div>

					<!-- Cards container with spacing and min-height for desktop -->
					<div class="space-y-6">
						<!-- Service cards grid -->
						<div class="feature-cards-grid grid grid-cols-1 sm:grid-cols-3 gap-5">
							{#each serviceCards as card, i}
								<div
									class="feature-card relative group {$currentSection === -1
										? ''
										: 'transition-all'}"
									style="opacity: {$currentSection === -1
										? 1
										: cardsVisible
											? 1
											: 0}; transform: {$currentSection === -1
										? 'none'
										: 'translate3d(0, 0, 0) scale(' +
											(cardsVisible ? 1 : 0.9) +
											')'}; transition-duration: {$currentSection === -1
										? '0ms'
										: '600ms'}; transition-delay: {cardsVisible
										? i * 100
										: 0}ms; transition-property: opacity, transform; will-change: {$currentSection ===
									-1
										? 'auto'
										: 'transform, opacity'};"
								>
									<!-- Animated gradient border -->
									<div
										class="absolute -inset-1 bg-gradient-to-br {card.gradient} rounded-2xl blur opacity-75 group-hover:opacity-100 animate-[gradient-rotate_4s_ease_infinite] transition-all duration-300"
									></div>

									<!-- Brighter hover glow -->
									<div
										class="absolute -inset-2 bg-gradient-to-br {card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-80 transition-all duration-300"
									></div>

									<!-- Card content -->
									<div class="relative bg-[#0b090a] rounded-2xl p-6 text-center">
										<div
											class="w-12 h-12 mb-4 text-white mx-auto flex items-center justify-center"
											style="min-width: 48px; min-height: 48px; background: rgba(255, 255, 255, 0.1); border-radius: 8px;"
										>
											{#if i === 0}
												<!-- Shield Check Icon -->
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="2"
													stroke="white"
													style="width: 48px; height: 48px;"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
													/>
												</svg>
											{:else if i === 1}
												<!-- Bolt Icon -->
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="2"
													stroke="white"
													style="width: 48px; height: 48px;"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
													/>
												</svg>
											{:else}
												<!-- Arrow Up Circle Icon -->
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="2"
													stroke="white"
													style="width: 48px; height: 48px;"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
											{/if}
										</div>
										<h4 class="text-lg font-semibold mb-2">{@html card.title}</h4>
										<p class="text-s text-white/60">{card.description}</p>
									</div>
								</div>
							{/each}
						</div>

						<!-- Pricing card with min-height for desktop -->
						<div
							class="pricing-card relative z-10"
							in:animations.pricing.in={{ ...animations.pricing.inProps, delay: 1200 }}
							out:animations.pricing.out={animations.pricing.outProps}
						>
							<!-- Animated gradient border with strong glow -->
							<div
								class="absolute bg-gradient-to-br from-[#4158D0] via-[#C850C0] to-[#FFCC70] rounded-2xl blur-xl opacity-70 animate-[pulse-glow_3s_ease-in-out_infinite] -z-10"
								style="left: 49%; top: 48%; right: -56%; bottom: -56%;"
							></div>
							<div
								class="absolute -inset-[2px] bg-gradient-to-br from-[#4158D0] via-[#C850C0] to-[#FFCC70] rounded-2xl opacity-90 animate-[gradient-rotate_3s_ease_infinite]"
							></div>

							<!-- Card content -->
							<div class="relative bg-[#0b090a] rounded-2xl p-4 sm:p-6 lg:p-8 text-center">
								<h3
									class="text-sm sm:text-base lg:text-lg font-semibold text-white/90 mb-2 sm:mb-3"
								>
									Simple, Transparent Pricing:
								</h3>
								<div class="text-base sm:text-lg lg:text-2xl font-bold mb-1 text-white/90">
									Starting at
								</div>
								<div class="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2 gradient-text">
									$100 per computer
								</div>
								<p class="text-sm sm:text-base lg:text-lg text-white/70 mb-2 sm:mb-4">
									(Most clients pay $400-600/month)
								</p>

								<div class="text-center bg-white/5 rounded-lg p-3 sm:p-4 lg:p-6 mb-2 sm:mb-4">
									<p
										class="text-xs sm:text-sm lg:text-base text-white/90 mb-1 sm:mb-2 lg:mb-3 font-medium"
									>
										✓ Minimum 4 computers
									</p>
									<p
										class="text-xs sm:text-sm lg:text-base text-white/90 mb-1 sm:mb-2 lg:mb-3 font-medium"
									>
										✓ No setup fees
									</p>
									<p
										class="text-xs sm:text-sm lg:text-base text-white/90 mb-1 sm:mb-2 lg:mb-3 font-medium"
									>
										✓ No contracts required
									</p>
									<p class="text-xs sm:text-sm lg:text-base text-white/90 font-medium">
										✓ Cancel anytime
									</p>
								</div>

								<div class="border-t border-white/20 pt-4 mb-4">
									<p class="text-sm font-semibold text-white/90 mb-2">Compare to:</p>
									<p class="text-xs text-white/60 mb-1">• Emergency IT calls: $150-200/hour</p>
									<p class="text-xs text-white/60 mb-1">• Full-time IT employee: $4,000+/month</p>
									<p class="text-xs text-white/60">• Big MSPs: $2,000-5,000/month</p>
								</div>

								<p class="text-sm text-[#4dd36f] font-semibold mb-4">
									You'll save more in prevented downtime than you'll invest in support
								</p>
								{#if $scheduleCallEnabled}
									<a
										href="/contact#schedule"
										class="text-[#4dd3ff] hover:text-[#4dd36f] transition-colors text-sm font-semibold"
									>
										Schedule your free consultation →
									</a>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	.feature-card {
		transition: transform 0.3s ease;
	}

	.feature-card:hover {
		transform: translateY(-5px) scale(1.02);
	}

	/* Desktop min-heights for layout stability */
	@media (min-width: 769px) {
		.space-y-4:first-of-type {
			min-height: 300px;
		}

		.space-y-6:first-of-type {
			min-height: 400px;
		}
	}

	/* Prevent layout shifts during animations - mobile only */
	@media (max-width: 768px) {
		/* Remove ALL height constraints for mobile */
		.space-y-4,
		.space-y-6,
		.feature-cards-grid,
		.pricing-card {
			min-height: auto !important;
			height: auto !important;
			max-height: none !important;
		}

		/* Ensure ALL containers flow naturally without height limits */
		.relative.z-10.max-w-7xl,
		.grid,
		.text-center {
			min-height: auto !important;
			height: auto !important;
			max-height: none !important;
		}
	}


	/* Match title sizes across all sections at intermediate resolutions */
	@media (min-width: 961px) and (max-width: 1400px) and (min-height: 800px) and (max-height: 1100px) {
		#what-you-get h2,
		#what-you-get h2[class*='text-xl'] {
			font-size: 3rem !important;
			line-height: 1.2 !important;
			font-weight: 700 !important;
			margin-bottom: 1rem !important;
		}
	}

	/* Intermediate desktop resolution fixes - expanded range */
	@media (min-width: 960px) and (max-width: 1440px) and (min-height: 900px) and (max-height: 1200px) {
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

		/* Grid adjustments */
		.grid.lg\\:grid-cols-2 {
			gap: 2rem !important;
			grid-template-columns: 1fr 1fr !important;
		}

		.grid.sm\\:grid-cols-3 {
			grid-template-columns: repeat(3, 1fr) !important;
			gap: 1rem !important;
		}

		/* Feature list text */
		.space-y-6 > div {
			margin-bottom: 0.75rem !important;
		}

		/* Service cards scaling */
		.service-card {
			padding: 1.5rem !important;
		}

		/* Pricing section adjustments */
		.text-4xl {
			font-size: 2rem !important;
		}

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

		.grid.lg\\:grid-cols-2 {
			gap: 1.5rem !important;
		}

		.grid.sm\\:grid-cols-3 {
			gap: 0.75rem !important;
		}

		h2 {
			font-size: 2rem !important;
			margin-bottom: 0.75rem !important;
		}

		h2[class*='text-xl'] {
			font-size: 2.75rem !important;
			font-weight: 700 !important;
		}

		.space-y-6 > div {
			margin-bottom: 0.5rem !important;
		}

		.text-4xl {
			font-size: 1.75rem !important;
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

		.grid.lg\\:grid-cols-2 {
			gap: 1rem !important;
		}

		.grid.sm\\:grid-cols-3 {
			grid-template-columns: repeat(2, 1fr) !important;
			gap: 0.5rem !important;
		}

		h2 {
			font-size: 1.75rem !important;
			margin-bottom: 0.5rem !important;
		}

		h2[class*='text-xl'] {
			font-size: 2.25rem !important;
			font-weight: 700 !important;
		}

		.space-y-6 > div {
			margin-bottom: 0.25rem !important;
		}

		.text-4xl {
			font-size: 1.5rem !important;
		}

		.text-2xl {
			font-size: 1.125rem !important;
		}

		.text-xl {
			font-size: 1rem !important;
		}

		.service-card {
			padding: 1rem !important;
		}
	}

	/* Mobile responsive layout only */
	@media (max-width: 768px) {
		#what-you-get.relative.h-full {
			height: auto !important;
			padding: 0 !important;
			overflow: visible !important;
			min-height: auto !important;
			display: block !important;
			align-items: flex-start !important;
		}

		/* Much higher specificity targeting - override everything */
		section#what-you-get.relative.h-full > div.relative.z-10.max-w-7xl,
		#what-you-get > div.relative.z-10.max-w-7xl,
		#what-you-get > div {
			padding: 60px 50px 60px 50px !important;
			overflow: visible !important;
			height: auto !important;
			min-height: auto !important;
			max-width: 100% !important;
			margin: 0 auto !important;
		}

		/* Grid container specific targeting */
		#what-you-get .grid.lg\\:grid-cols-2,
		#what-you-get div.grid.lg\\:grid-cols-2.gap-12.items-start {
			grid-template-columns: 1fr !important;
			gap: 2rem !important;
			max-width: 100% !important;
			overflow-x: hidden !important;
			overflow-y: visible !important;
			width: 100% !important;
			padding: 0 20px !important; /* Additional inner padding for grid */
		}

		#what-you-get .grid.md\\:grid-cols-3,
		#what-you-get .grid.sm\\:grid-cols-3 {
			grid-template-columns: 1fr !important;
			gap: 1rem !important;
			max-width: 100% !important;
			overflow: visible !important;
			width: 100% !important;
		}

		/* Fix feature list text overflow */
		#what-you-get .space-y-2 p,
		#what-you-get .space-y-3 p,
		#what-you-get .space-y-4 p {
			word-wrap: break-word !important;
			overflow-wrap: break-word !important;
			hyphens: auto !important;
		}

		#what-you-get section > div > div,
		#what-you-get .relative.z-10,
		#what-you-get .max-w-7xl {
			height: auto !important;
			min-height: auto !important;
			max-height: none !important;
		}

		#what-you-get .max-w-7xl {
			max-width: 100% !important;
			padding: 0 !important;
			overflow-x: hidden !important;
		}

		/* Target the direct child containers within the grid */
		#what-you-get .grid > div:first-child,
		#what-you-get .grid > div:last-child {
			padding: 0 15px !important;
			margin: 0 !important;
		}

		.space-y-6 {
			overflow: visible !important;
		}

		.feature-cards-grid {
			overflow: visible !important;
			min-height: auto !important;
		}
	}
</style>

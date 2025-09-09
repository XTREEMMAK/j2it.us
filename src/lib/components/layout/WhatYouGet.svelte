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
		'Small offices, retail shops, or professional services with 3-10 computers',
		'Businesses without a dedicated IT person on staff',
		'Companies tired of emergency IT bills and unpredictable costs'
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
	class="relative h-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
>
	<div class="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#120f1a]"></div>

	{#if visible}
		<div class="relative z-10 max-w-7xl mx-auto">
			<div class="grid lg:grid-cols-2 gap-12 items-start">
				<!-- Left side - Features list -->
				<div>
					<h2
						class="text-3xl sm:text-4xl font-bold mb-8 transition-all duration-500"
						style="opacity: {textVisible
							? 1
							: 0}; transform: translate3d(0, 0, 0) scale({textVisible
							? 1
							: 0.95}); will-change: transform, opacity;"
					>
						What You Get
					</h2>

					<div class="space-y-4" style="min-height: {textVisible ? 'auto' : '300px'};">
						{#each features as feature, i}
							<div
								class="flex items-start gap-3 transition-all duration-500"
								style="opacity: {textVisible
									? 1
									: 0}; transform: translate3d(0, 0, 0) scale({textVisible
									? 1
									: 0.95}); transition-delay: {200 + i * 100}ms; will-change: transform, opacity;"
							>
								<span class="text-[#4dd36f] text-3xl font-bold mt-1">✓</span>
								<p class="text-3xl text-white/80">{feature}</p>
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

					<!-- Cards container with spacing -->
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

						<!-- Pricing card -->
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
							<div class="relative bg-[#0b090a] rounded-2xl p-8 text-center">
								<h3 class="text-lg font-semibold text-white/90 mb-3">Flat Rate:</h3>
								<div class="text-4xl font-bold mb-2 gradient-text">$400/month</div>
								<p class="text-lg text-white/70 mb-2">for up to 4 computers</p>
								<p class="text-sm text-white/80 mb-4">Or: $100 per computer/month</p>
								<p class="text-sm text-white/80 mb-4">No hidden fees</p>
								<p class="text-xs text-white/50 mb-6 leading-relaxed">
									Get enterprise-level IT support without the enterprise price tag.<br />
									Simple, transparent pricing that fits your budget.
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
		/* Ensure cards maintain layout space during animation */
		min-height: 120px; /* Reserve minimum space */
	}

	.feature-card:hover {
		transform: translateY(-5px) scale(1.02);
	}

	/* Prevent layout shifts during animations - mobile only */
	@media (max-width: 769px) {
		.feature-cards-grid {
			/* Reserve space for cards during animation on mobile only */
			min-height: 400px; /* Adjust based on content */
		}
	}

	@keyframes gradient-rotate {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	@keyframes pulse-glow {
		0%,
		100% {
			opacity: 0.6;
			transform: scale(1);
		}
		50% {
			opacity: 0.9;
			transform: scale(1.05);
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
			height: auto !important;
			min-height: 100vh !important; /* Ensure minimum viewport height */
		}

		/* Add padding to inner container */
		section > div {
			padding: 30px !important;
			overflow: visible !important; /* Allow content to expand naturally */
			height: auto !important;
			min-height: auto !important;
		}

		/* Prevent overflow and ensure proper spacing */
		.grid.lg\\:grid-cols-2 {
			grid-template-columns: 1fr !important;
			gap: 2rem !important;
			max-width: 100% !important;
			overflow-x: hidden !important;
			overflow-y: visible !important;
		}

		/* Ensure service cards stack properly on mobile */
		.grid.md\\:grid-cols-3,
		.grid.sm\\:grid-cols-3 {
			grid-template-columns: 1fr !important;
			gap: 1.5rem !important;
			max-width: 100% !important;
			overflow: visible !important; /* Allow content to flow naturally */
		}

		/* Prevent content from being too wide */
		.max-w-7xl {
			max-width: 100% !important;
			padding: 0 !important;
			overflow-x: hidden !important; /* Prevent horizontal scroll only */
			min-height: 80vh !important; /* Reserve space for mobile animations */
		}

		/* Better mobile text spacing */
		.text-3xl.sm\\:text-4xl {
			font-size: 2.5rem !important;
			line-height: 1.2 !important;
		}

		/* Fix cards container spacing */
		.space-y-6 {
			overflow: visible !important; /* Allow content to flow naturally */
		}

		.feature-cards-grid {
			overflow: visible !important; /* Allow content to flow naturally */
			min-height: auto !important;
		}
	}
</style>

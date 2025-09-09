<script>
	import { onMount } from 'svelte';
	import { currentSection, scrollDirection, isScrolling } from '$lib/stores/sectionScroll.js';
	import { scheduleCallEnabled } from '$lib/stores/features.js';
	import Icon from '@iconify/svelte';

	$: isVisible = $currentSection === 0 || $currentSection === -1; // Show on mobile when currentSection is -1
	$: isActive = isVisible && !$isScrolling;

	let mounted = false;
	let showHeadline = false;
	let showSubheadline = false;
	let showButtons = false;
	let hideTimeout = null;
	let showTimeouts = [];

	onMount(() => {
		mounted = true;

		// On mobile (currentSection === -1), show everything immediately
		if ($currentSection === -1) {
			showHeadline = true;
			showSubheadline = true;
			showButtons = true;
			return;
		}

		// Desktop: Trigger initial animations on page load
		if (isVisible) {
			showTimeouts.push(
				setTimeout(() => {
					showHeadline = true;
				}, 100)
			);
			showTimeouts.push(
				setTimeout(() => {
					showSubheadline = true;
				}, 300)
			);
			showTimeouts.push(
				setTimeout(() => {
					showButtons = true;
				}, 500)
			);
		}

		return () => {
			showTimeouts.forEach((t) => clearTimeout(t));
			if (hideTimeout) clearTimeout(hideTimeout);
		};
	});

	// Handle visibility changes from scrolling (desktop only)
	$: if (
		mounted &&
		$currentSection !== -1 &&
		!isVisible &&
		(showHeadline || showSubheadline || showButtons)
	) {
		// Clear any show timeouts
		showTimeouts.forEach((t) => clearTimeout(t));
		showTimeouts = [];

		// Don't reset if we're already hiding
		if (!hideTimeout) {
			hideTimeout = setTimeout(() => {
				showHeadline = false;
				showSubheadline = false;
				showButtons = false;
				hideTimeout = null;
			}, 500); // Allow out animations to complete
		}
	}

	// Show elements when section becomes visible (desktop only)
	$: if (mounted && $currentSection !== -1 && isVisible && !showHeadline) {
		// Clear any hide timeout if we're showing again
		if (hideTimeout) {
			clearTimeout(hideTimeout);
			hideTimeout = null;
		}

		// Show immediately if not first load, with delays if first load
		const isFirstLoad = !showHeadline && !showSubheadline && !showButtons;
		if (isFirstLoad) {
			showTimeouts.push(
				setTimeout(() => {
					showHeadline = true;
				}, 100)
			);
			showTimeouts.push(
				setTimeout(() => {
					showSubheadline = true;
				}, 300)
			);
			showTimeouts.push(
				setTimeout(() => {
					showButtons = true;
				}, 500)
			);
		} else {
			showHeadline = true;
			showSubheadline = true;
			showButtons = true;
		}
	}
</script>

<section class="relative h-full flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
	<!-- Background gradients -->
	<div class="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] to-[#16161f]"></div>

	<!-- Animated floating glows -->
	<div
		class="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#4dd36f]/30 to-transparent blur-[100px] animate-[float-glow_8s_ease-in-out_infinite] opacity-50"
	></div>
	<div
		class="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#4dd3ff]/30 to-transparent blur-[100px] animate-[float-glow-reverse_10s_ease-in-out_infinite] opacity-50"
	></div>

	<div
		class="relative z-10 max-w-6xl mx-auto transition-all duration-500"
		style="opacity: {isVisible ? 1 : 0}; visibility: {isVisible ? 'visible' : 'hidden'};"
	>
		<div class="text-center lg:text-left">
			<!-- Main headline -->
			<h1
				class="hero-title font-bold leading-tight mb-6 transition-all duration-600"
				style="opacity: {showHeadline ? 1 : 0}; transform: translate3d(0, 0, 0) scale({showHeadline
					? 1
					: 0.95}); will-change: transform, opacity;"
			>
				<span class="block">Affordable IT Support for</span>
				<span class="block gradient-text">Small Businesses</span>
				<span class="block text-white/90">— Simple, Worry-Free</span>
			</h1>

			<!-- Subheadline -->
			<p
				class="text-xl sm:text-2xl text-white/70 mb-8 max-w-3xl mx-auto lg:mx-0 transition-all duration-600"
				style="opacity: {showSubheadline
					? 1
					: 0}; transform: translate3d(0, 0, 0) scale({showSubheadline
					? 1
					: 0.95}); transition-delay: 100ms; will-change: transform, opacity;"
			>
				For just <span class="text-[#4dd36f] font-semibold">$400/month</span>, I'll keep your
				computers secure, backed up, and running so you can focus on running your business, not
				fighting with tech.
			</p>

			<!-- CTA Buttons -->
			<div
				class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-600"
				style="opacity: {showButtons ? 1 : 0}; transform: translate3d(0, 0, 0) scale({showButtons
					? 1
					: 0.95}); transition-delay: 200ms; will-change: transform, opacity;"
			>
				<a href="/health-check" class="btn-primary inline-flex items-center gap-3">
					<Icon icon="heroicons:check-circle" class="w-7 h-7" />
					Get Your Free IT Health Check
				</a>
				{#if $scheduleCallEnabled}
					<a href="/contact#schedule" class="btn-secondary inline-flex items-center gap-3">
						<Icon icon="heroicons:calendar-days" class="w-7 h-7" />
						Schedule a Free 20-Min Call
					</a>
				{/if}
			</div>

			<!-- Trust indicators -->
			<div
				class="mt-12 flex flex-col sm:flex-row items-center gap-6 text-sm text-white/50 justify-center lg:justify-start transition-all duration-600"
				style="opacity: {showButtons ? 1 : 0}; transform: translate3d(0, 0, 0) scale({showButtons
					? 1
					: 0.95}); transition-delay: 300ms; will-change: transform, opacity;"
			>
				<div class="flex items-center gap-2">
					<Icon icon="heroicons:check-circle-solid" class="w-5 h-5 text-[#4dd36f]" />
					<span>No long-term contracts</span>
				</div>
				<div class="flex items-center gap-2">
					<Icon icon="heroicons:check-circle-solid" class="w-5 h-5 text-[#4dd36f]" />
					<span>Flat monthly pricing</span>
				</div>
				<div class="flex items-center gap-2">
					<Icon icon="heroicons:check-circle-solid" class="w-5 h-5 text-[#4dd36f]" />
					<span>Personal service</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes float-glow {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(30px, -30px) scale(1.1);
		}
	}

	@keyframes float-glow-reverse {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(-30px, 30px) scale(1.1);
		}
	}

	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
	}

	/* Override for larger screens */
	@media (min-width: 1024px) {
		.hero-title {
			font-size: 3.75rem !important; /* 60px equivalent */
		}
	}

	/* Mobile adjustments */
	@media (max-width: 769px) {
		/* Remove padding from section to preserve background */
		section {
			padding: 0 !important;
			overflow: visible !important; /* Allow content to expand naturally */
			min-height: 100vh !important; /* Ensure minimum viewport height */
		}

		/* Add padding to inner container */
		section > div {
			padding: 30px !important;
			overflow: visible !important; /* Allow content to expand naturally */
		}

		/* Reserve space for mobile animations */
		.relative.z-10.max-w-6xl {
			min-height: 70vh !important; /* Reserve space on mobile only */
		}

		.hero-title {
			font-size: 4rem !important; /* Much larger for mobile */
			line-height: 1.05 !important;
			margin-bottom: 1.5rem !important;
		}

		/* Target spans directly for consistent sizing */
		.hero-title span {
			font-size: 4rem !important;
			line-height: 1.05 !important;
		}

		/* Medium mobile screens */
		@media (max-width: 600px) {
			.hero-title,
			.hero-title span {
				font-size: 3.6rem !important;
			}
		}

		/* Smaller mobile screens */
		@media (max-width: 479px) {
			.hero-title,
			.hero-title span {
				font-size: 3.2rem !important;
			}
			.hero-title {
				margin-bottom: 1rem !important;
			}
		}

		/* Small screens - reduce size for better fit */
		@media (max-width: 450px) {
			.hero-title,
			.hero-title span {
				font-size: 3rem !important;
			}
		}

		/* Very small screens */
		@media (max-width: 360px) {
			.hero-title,
			.hero-title span {
				font-size: 2.6rem !important;
			}
		}
	}
</style>

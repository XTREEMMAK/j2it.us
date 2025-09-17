<script>
	import { onMount } from 'svelte';
	import HeroSection from '$lib/components/layout/HeroSection.svelte';
	import ProfileIntro from '$lib/components/layout/ProfileIntro.svelte';
	import WhatYouGet from '$lib/components/layout/WhatYouGet.svelte';
	import GoogleReviews from '$lib/components/layout/GoogleReviews.svelte';
	import HowItWorks from '$lib/components/layout/HowItWorks.svelte';
	import SectionIndicator from '$lib/components/layout/SectionIndicator.svelte';
	import { setupSectionScrolling, currentSection } from '$lib/stores/sectionScroll.js';
	import { get } from 'svelte/store';

	let hasReviews = false; // Start conservatively - will be updated by GoogleReviews component
	let reviewsLoaded = false;

	// Handle reviews visibility change
	function handleReviewsVisibility(event) {
		hasReviews = event.detail.hasReviews;
		reviewsLoaded = true;

		// Update container height after reviews visibility is determined
		updateContainerHeight();
	}

	function updateContainerHeight() {
		const container = document.querySelector('.full-page-scroll-container');
		if (container) {
			const sectionCount = hasReviews ? 5 : 4; // With or without reviews
			container.style.height = `${sectionCount * 100}vh`;
		}
	}

	onMount(() => {
		// Check if mobile - use consistent breakpoint with CSS
		const isMobile = window.innerWidth < 769;
		
		if (!isMobile) {
			// Desktop: full-page scroll behavior
			document.body.classList.add('homepage');
			
			// Set initial container height based on current hasReviews value
			updateContainerHeight();
			
			const cleanup = setupSectionScrolling();

			return () => {
				document.body.classList.remove('homepage');
				cleanup && cleanup();
			};
		} else {
			// Mobile: Simple continuous scroll - NO custom scroll events
			document.body.classList.add('homepage-mobile');

			// Simply set all sections to be visible on mobile
			currentSection.set(-1); // Special value meaning "show all sections"

			// Ensure body allows natural scrolling on mobile
			document.body.style.overflow = 'auto';
			document.body.style.height = 'auto';

			return () => {
				document.body.classList.remove('homepage-mobile');
				document.body.style.overflow = '';
				document.body.style.height = '';
			};
		}
	});

	// Update container height when reviews status changes
	$: if (reviewsLoaded) {
		updateContainerHeight();
	}
</script>

<svelte:head>
	<title>J2 IT Solutions - Stop Paying $200/Hour for Emergency IT</title>
	<meta
		name="description"
		content="Get enterprise-level IT support for $400/month - less than one emergency IT visit. Save $4000+/month vs full-time IT staff. Predictable pricing, immediate ROI."
	/>
</svelte:head>

<div class="full-page-scroll-container">
	<!-- Hero Section -->
	<section data-section="0" class="full-page-section">
		<HeroSection />
	</section>

	<!-- Profile Introduction -->
	<section data-section="1" class="full-page-section">
		<ProfileIntro />
	</section>

	<!-- What You Get Section -->
	<section data-section="2" class="full-page-section">
		<WhatYouGet />
	</section>

	<!-- Google Reviews Section (conditionally shown) -->
	{#if hasReviews && reviewsLoaded}
		<div data-section="3" class="full-page-section reviews-section">
			<GoogleReviews on:reviewsVisibility={handleReviewsVisibility} />
		</div>
	{/if}

	<!-- Always load GoogleReviews component to determine visibility, but hide it when not needed -->
	{#if !reviewsLoaded || !hasReviews}
		<div style="display: none;">
			<GoogleReviews
				on:reviewsVisibility={handleReviewsVisibility}
				hideIfEmpty={false}
			/>
		</div>
	{/if}

	<!-- How It Works Section -->
	<section data-section={hasReviews ? 4 : 3} class="full-page-section">
		<HowItWorks />
	</section>
</div>

<!-- Section Navigation Indicator (Desktop only) -->
<div class="hidden lg:block">
	<SectionIndicator {hasReviews} />
</div>

<style>
	/* Desktop: Full page scroll behavior */
	@media (min-width: 770px) {
		/* Hide footer on homepage by default to prevent flash */
		:global(body:has(.full-page-scroll-container) footer) {
			display: none;
		}

		:global(.homepage) {
			overflow: hidden;
			height: 100vh;
		}

		:global(.homepage footer) {
			display: none;
		}

		.full-page-scroll-container {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 400vh; /* Default to 4 sections, updated dynamically */
			will-change: transform;
			transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		}

		.full-page-section {
			height: 100vh;
			width: 100%;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			/* Add top padding to prevent content from being hidden under nav */
			padding-top: 100px;
		}

		/* Ensure section content has proper spacing from nav */
		.full-page-section :global(section) {
			padding-top: 20px !important;
		}
	}

	/* Intermediate desktop resolutions - target problematic ranges */
	@media (min-width: 961px) and (max-width: 1400px) and (min-height: 800px) and (max-height: 1100px) {
		.full-page-section {
			padding-top: 90px;
			align-items: flex-start;
			padding-bottom: 20px;
			overflow-y: auto;
			overflow-x: hidden;
		}

		.full-page-section :global(section) {
			padding-top: 30px !important;
			padding-bottom: 30px !important;
			max-height: none;
			overflow: visible;
		}

		/* Better scaling for intermediate resolutions */
		.full-page-section :global(h1) {
			font-size: 2.5rem !important;
			line-height: 1.1 !important;
			margin-bottom: 1rem !important;
		}

		.full-page-section :global(h2) {
			font-size: 2rem !important;
			line-height: 1.2 !important;
			margin-bottom: 0.75rem !important;
		}

		.full-page-section :global(h3) {
			font-size: 1.75rem !important;
			line-height: 1.2 !important;
			margin-bottom: 0.5rem !important;
		}

		.full-page-section :global(.text-3xl) {
			font-size: 1.6rem !important;
		}

		.full-page-section :global(.text-2xl) {
			font-size: 1.4rem !important;
		}

		.full-page-section :global(.text-xl) {
			font-size: 1.2rem !important;
		}

		/* Reduce spacing for better fit */
		.full-page-section :global(.mb-12) {
			margin-bottom: 1.5rem !important;
		}

		.full-page-section :global(.mb-8) {
			margin-bottom: 1rem !important;
		}

		.full-page-section :global(.mb-6) {
			margin-bottom: 0.75rem !important;
		}

		.full-page-section :global(.mb-4) {
			margin-bottom: 0.5rem !important;
		}

		.full-page-section :global(.gap-12) {
			gap: 1.5rem !important;
		}

		.full-page-section :global(.gap-8) {
			gap: 1rem !important;
		}
	}

	/* Desktop with shorter heights - need to scale down */
	@media (min-width: 770px) and (max-height: 950px) {
		.full-page-section {
			padding-top: 80px;
			align-items: flex-start;
			overflow-y: auto;
			overflow-x: hidden;
		}

		.full-page-section :global(section) {
			padding-top: 20px !important;
			padding-bottom: 20px !important;
			max-height: none;
			overflow: visible;
		}

		/* Scale down text significantly on desktop short heights */
		.full-page-section :global(h1) {
			font-size: 2.2rem !important;
		}

		.full-page-section :global(h2) {
			font-size: 1.8rem !important;
		}

		.full-page-section :global(h3) {
			font-size: 1.5rem !important;
		}

		.full-page-section :global(.text-3xl) {
			font-size: 1.4rem !important;
		}

		.full-page-section :global(.text-2xl) {
			font-size: 1.2rem !important;
		}

		.full-page-section :global(.text-xl) {
			font-size: 1.1rem !important;
		}

		/* Reduce spacing between elements */
		.full-page-section :global(.mb-8) {
			margin-bottom: 1rem !important;
		}

		.full-page-section :global(.mb-6) {
			margin-bottom: 0.75rem !important;
		}

		.full-page-section :global(.mb-4) {
			margin-bottom: 0.5rem !important;
		}
	}

	/* Very short desktop heights like 1024x800 */
	@media (min-width: 770px) and (max-height: 800px) {
		.full-page-section {
			padding-top: 70px;
			align-items: flex-start;
			overflow-y: auto;
			overflow-x: hidden;
		}

		.full-page-section :global(section) {
			padding-top: 10px !important;
			padding-bottom: 10px !important;
			max-height: none;
			overflow: visible;
		}

		/* Aggressive text scaling for very short heights */
		.full-page-section :global(h1) {
			font-size: 1.8rem !important;
			line-height: 1.1 !important;
			margin-bottom: 0.5rem !important;
		}

		.full-page-section :global(h2) {
			font-size: 1.4rem !important;
			line-height: 1.2 !important;
			margin-bottom: 0.5rem !important;
		}

		.full-page-section :global(h3) {
			font-size: 1.2rem !important;
			line-height: 1.2 !important;
			margin-bottom: 0.25rem !important;
		}

		.full-page-section :global(.text-3xl) {
			font-size: 1.1rem !important;
		}

		.full-page-section :global(.text-2xl) {
			font-size: 1rem !important;
		}

		.full-page-section :global(.text-xl) {
			font-size: 0.95rem !important;
		}

		.full-page-section :global(p) {
			font-size: 0.85rem !important;
			line-height: 1.3 !important;
		}

		/* Aggressive spacing reduction */
		.full-page-section :global(.mb-12) {
			margin-bottom: 0.5rem !important;
		}

		.full-page-section :global(.mb-8) {
			margin-bottom: 0.5rem !important;
		}

		.full-page-section :global(.mb-6) {
			margin-bottom: 0.25rem !important;
		}

		.full-page-section :global(.mb-4) {
			margin-bottom: 0.25rem !important;
		}

		.full-page-section :global(.gap-12) {
			gap: 0.5rem !important;
		}

		.full-page-section :global(.gap-8) {
			gap: 0.5rem !important;
		}
	}

	/* Mobile: Natural continuous scroll */
	@media (max-width: 768px) {
		:global(.homepage-mobile) {
			overflow-x: hidden !important;
			overflow-y: auto !important; /* Allow natural vertical scrolling */
			-webkit-overflow-scrolling: touch;
			height: auto !important;
		}

		.full-page-scroll-container {
			position: static !important; /* Natural document flow */
			width: 100%;
			height: auto !important; /* Let content determine height */
			transform: none !important; /* Remove any transforms */
		}

		.full-page-section {
			min-height: 100vh; /* Allow sections to expand based on content */
			width: 100%;
			position: relative;
			display: flex;
			align-items: flex-start; /* Align to top for content overflow */
			justify-content: center;
			overflow: visible; /* Allow content to be visible */
		}

		/* Override individual section components for mobile */
		.full-page-section :global(section) {
			min-height: 100vh !important; /* Allow sections to expand based on content */
			padding: 0 !important; /* Remove padding from section to preserve backgrounds */
			overflow: visible !important; /* Allow content to be visible and not clipped */
			display: flex !important;
			flex-direction: column !important;
			justify-content: center !important;
		}

		/* Universal padding for all mobile sections */
		.full-page-section :global(section) {
			padding: 100px 20px 80px 20px !important; /* Reduced side padding */
		}

		/* Prevent content overflow on mobile - more comprehensive */
		:global(html),
		:global(body) {
			overflow-x: hidden !important;
			max-width: 100vw !important;
		}

		.full-page-section {
			overflow-x: hidden !important;
			max-width: 100vw !important;
		}

		.full-page-section :global(section) {
			overflow-x: hidden !important; /* Prevent horizontal scrollbars only */
			max-width: 100vw !important;
		}

		.full-page-section :global(section > div),
		.full-page-section :global(.max-w-6xl),
		.full-page-section :global(.max-w-5xl),
		.full-page-section :global(.max-w-4xl) {
			max-width: 100% !important;
			padding-left: 20px !important;
			padding-right: 20px !important;
			overflow-x: hidden !important; /* Prevent horizontal scroll only */
		}

		/* Show footer on mobile - natural scroll should include footer */
		:global(.homepage-mobile footer) {
			display: block !important;
		}
	}


	:global(.full-page-section > *) {
		width: 100%;
	}

	/* Custom scrollbar for sections that overflow */
	.full-page-section::-webkit-scrollbar {
		width: 8px;
	}

	.full-page-section::-webkit-scrollbar-track {
		background: rgba(26, 26, 46, 0.3);
		border-radius: 4px;
	}

	.full-page-section::-webkit-scrollbar-thumb {
		background: rgba(77, 211, 255, 0.4);
		border-radius: 4px;
	}

	.full-page-section::-webkit-scrollbar-thumb:hover {
		background: rgba(77, 211, 255, 0.6);
	}
</style>

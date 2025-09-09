<script>
	import { onMount } from 'svelte';
	import HeroSection from '$lib/components/layout/HeroSection.svelte';
	import ProfileIntro from '$lib/components/layout/ProfileIntro.svelte';
	import WhatYouGet from '$lib/components/layout/WhatYouGet.svelte';
	import HowItWorks from '$lib/components/layout/HowItWorks.svelte';
	import SectionIndicator from '$lib/components/layout/SectionIndicator.svelte';
	import { setupSectionScrolling, currentSection } from '$lib/stores/sectionScroll.js';
	import { get } from 'svelte/store';

	onMount(() => {
		// Check if mobile
		const isMobile = window.innerWidth <= 769;

		if (!isMobile) {
			// Desktop: full-page scroll behavior
			document.body.classList.add('homepage');
			const cleanup = setupSectionScrolling();

			return () => {
				document.body.classList.remove('homepage');
				cleanup && cleanup();
			};
		} else {
			// Mobile: Simple continuous scroll - just show all sections
			document.body.classList.add('homepage-mobile');

			// Simply set all sections to be visible on mobile
			currentSection.set(-1); // Special value meaning "show all sections"

			return () => {
				document.body.classList.remove('homepage-mobile');
			};
		}
	});
</script>

<svelte:head>
	<title>J2 IT Solutions - Affordable IT Support for Small Businesses</title>
	<meta
		name="description"
		content="Affordable IT support for small businesses. For just $400/month, get secure, reliable IT management without the enterprise price tag. No contracts, no surprises."
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

	<!-- How It Works Section -->
	<section data-section="3" class="full-page-section">
		<HowItWorks />
	</section>
</div>

<!-- Section Navigation Indicator (Desktop only) -->
<div class="hidden lg:block">
	<SectionIndicator />
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
			height: 400vh; /* 4 sections * 100vh */
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
		}
	}

	/* Mobile: Natural continuous scroll */
	@media (max-width: 769px) {
		:global(.homepage-mobile) {
			overflow-x: hidden; /* Prevent horizontal scroll only */
			overscroll-behavior-y: none; /* Prevent pull-to-refresh */
			-webkit-overflow-scrolling: touch;
		}

		.full-page-scroll-container {
			position: relative; /* Natural document flow */
			width: 100%;
			height: auto; /* Let content determine height */
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

		/* Add padding to inner content instead - account for mobile nav */
		.full-page-section :global(section > div) {
			padding: 80px 30px 120px 30px !important; /* Extra bottom padding to prevent premature scroll down */
		}

		/* Target deeper nested content containers as well */
		.full-page-section :global(.max-w-6xl),
		.full-page-section :global(.max-w-5xl),
		.full-page-section :global(.max-w-7xl) {
			padding-left: 30px !important;
			padding-right: 30px !important;
		}

		/* Keep 30px padding consistent across all screen sizes */

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
			padding-left: 30px !important;
			padding-right: 30px !important;
			overflow-x: hidden !important; /* Prevent horizontal scroll only */
		}

		/* Hide footer on mobile full-page mode */
		:global(.homepage-mobile footer) {
			display: none !important;
		}
	}

	:global(.full-page-section > *) {
		width: 100%;
	}
</style>

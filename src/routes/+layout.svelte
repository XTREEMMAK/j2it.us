<script>
	import '../reset.css';
	import '../app.css';
	import { PUBLIC_CDN_URL } from '$env/static/public';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navigation from '$lib/components/layout/Navigation.svelte';
	import MyFooter from '$lib/components/layout/Footer.svelte';
	import TawkMessenger from 'tawk-messenger-svelte';
	import { PUBLIC_TAWK_PROPERTY_ID, PUBLIC_TAWK_WIDGET_ID } from '$env/static/public';
	import { throttle } from '$lib/utils/throttle.js';
	import { createLocalBusinessSchema } from '$lib/utils/structuredData.js';

	let mouseX = 0;
	let mouseY = 0;
	let cursorX = 0;
	let cursorY = 0;
	let showTawk = false;
	let animationId = null;

	onMount(() => {
		// Check if mobile and hide Tawk on mobile
		showTawk = window.innerWidth > 768;

		// Throttled mouse move handler - only update every 16ms (60fps max)
		const handleMouseMove = throttle((e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		}, 16);

		const animateCursor = () => {
			const speed = 0.15;
			cursorX += (mouseX - cursorX) * speed;
			cursorY += (mouseY - cursorY) * speed;
			animationId = requestAnimationFrame(animateCursor);
		};

		document.addEventListener('mousemove', handleMouseMove);
		animateCursor();

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			if (animationId) cancelAnimationFrame(animationId);
		};
	});

	// Smooth navigation transitions
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Generate structured data from environment variables
	const structuredData = createLocalBusinessSchema();
</script>

<svelte:head>
	<!-- Inter font -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>

	<title>J²IT: IT and Web Solutions – Reliable Tech Support for Small Business</title>
	<meta
		name="description"
		content="J²IT offers reliable IT support, web solutions, and consulting for small businesses, run by Jamaal Ephriam."
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Open Graph -->
	<meta property="og:title" content="J²IT: IT and Web Solutions" />
	<meta
		property="og:description"
		content="Reliable IT support and web solutions for small business by Jamaal Ephriam."
	/>
	<meta property="og:image" content="{PUBLIC_CDN_URL}/images/Jamaal_Photo.webp" />
	<meta property="og:url" content="https://www.j2it.us" />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="J²IT: IT and Web Solutions" />
	<meta
		name="twitter:description"
		content="Reliable IT support and tech consulting for small business by Jamaal Ephriam."
	/>
	<meta name="twitter:image" content="{PUBLIC_CDN_URL}/images/Jamaal_Photo.webp" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://www.j2it.us" />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<div class="min-h-screen bg-[#0f0f1a] text-white">
	<!-- Mouse glow effect -->
	<div
		class="mouse-glow fixed pointer-events-none z-10 rounded-full opacity-40"
		style="left: {cursorX - 150}px; top: {cursorY -
			150}px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(77, 211, 255, 0.4) 0%, rgba(77, 211, 111, 0.3) 40%, transparent 80%); filter: blur(60px);"
	></div>

	<Navigation />

	<main class="relative">
		<slot />
	</main>

	<MyFooter copyyear={2025} />

	<!-- Tawk.to Live Chat (Desktop Only) -->
	{#if showTawk}
		<TawkMessenger propertyId={PUBLIC_TAWK_PROPERTY_ID} widgetId={PUBLIC_TAWK_WIDGET_ID} />
	{/if}
</div>

<style>
	/* View transition animations */
	@supports (view-transition-name: none) {
		::view-transition-old(root) {
			animation: fade-out 0.2s ease-out;
		}

		::view-transition-new(root) {
			animation: fade-in 0.3s ease-out;
		}

		@keyframes fade-out {
			from {
				opacity: 1;
			}
			to {
				opacity: 0;
			}
		}

		@keyframes fade-in {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
	}
</style>

<script>
	import { onMount } from 'svelte';
	import '../../reset.css';
	import '../../app.css';
	import { PUBLIC_CDN_URL } from '$env/static/public';
	import { onNavigate } from '$app/navigation';

	let mouseX = 0;
	let mouseY = 0;
	let cursorX = 0;
	let cursorY = 0;

	onMount(() => {
		// Hide Tawk.to widget on card page
		const hideTawk = () => {
			// Try multiple selectors to ensure Tawk.to is hidden
			const tawkElements = document.querySelectorAll(
				'#tawk-widget-container, [id^="tawk"], .tawk-widget, iframe[title*="chat"], iframe[src*="tawk"]'
			);
			tawkElements.forEach((el) => {
				el.style.display = 'none !important';
				el.style.visibility = 'hidden !important';
			});

			// Also try the Tawk API if available
			if (window.Tawk_API?.hideWidget) {
				window.Tawk_API.hideWidget();
			}
		};

		// Run immediately and after a delay to catch late-loading widgets
		hideTawk();
		setTimeout(hideTawk, 100);
		setTimeout(hideTawk, 500);
		setTimeout(hideTawk, 1000);

		const handleMouseMove = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};

		const animateCursor = () => {
			const speed = 0.15;
			cursorX += (mouseX - cursorX) * speed;
			cursorY += (mouseY - cursorY) * speed;
			requestAnimationFrame(animateCursor);
		};

		document.addEventListener('mousemove', handleMouseMove);
		animateCursor();

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
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
</script>

<svelte:head>
	<!-- Inter font -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>

	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="min-h-screen bg-[#0f0f1a] text-white">
	<!-- Mouse glow effect -->
	<div
		class="mouse-glow fixed pointer-events-none z-10 rounded-full opacity-40"
		style="left: {cursorX - 150}px; top: {cursorY -
			150}px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(77, 211, 255, 0.4) 0%, rgba(77, 211, 111, 0.3) 40%, transparent 80%); filter: blur(60px);"
	></div>

	<main class="relative">
		<slot />
	</main>

	<!-- No Footer or Tawk.to on card page -->
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

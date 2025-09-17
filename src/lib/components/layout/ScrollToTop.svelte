<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	let showScrollTop = false;
	let isMobile = false;

	onMount(() => {
		if (!browser) return;

		// Check if mobile
		const checkMobile = () => {
			isMobile = window.innerWidth < 769;
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		// Handle scroll events
		const handleScroll = () => {
			if (!isMobile) {
				showScrollTop = false;
				return;
			}

			// Show button when scrolled down more than 300px
			showScrollTop = window.scrollY > 300;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', checkMobile);
		};
	});

	function scrollToTop() {
		if (!browser) return;

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

{#if isMobile && showScrollTop}
	<button
		on:click={scrollToTop}
		class="scroll-to-top fixed bottom-6 right-6 z-50 bg-gradient-to-br from-[#4dd3ff] to-[#4dd36f] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
		aria-label="Scroll to top"
	>
		<Icon icon="heroicons:chevron-up" class="w-6 h-6" />
	</button>
{/if}

<style>
	.scroll-to-top {
		backdrop-filter: blur(10px);
		animation: fadeInUp 0.3s ease-out;
	}

	.scroll-to-top:hover {
		box-shadow: 0 0 20px rgba(77, 211, 255, 0.4);
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Only show on mobile devices */
	@media (min-width: 769px) {
		.scroll-to-top {
			display: none !important;
		}
	}
</style>

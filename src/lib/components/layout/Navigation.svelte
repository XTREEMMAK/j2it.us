<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { scheduleCallEnabled, insightsEnabled } from '$lib/stores/features.js';
	import { slide, fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let mobileMenuOpen = false;
	let scrolled = false;

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	$: navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/services', label: 'Services' },
		{ href: '/health-check', label: 'Free IT Health Check' },
		...($insightsEnabled ? [{ href: '/insights', label: 'Insights' }] : []),
		{ href: '/contact', label: 'Contact' }
	];
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
		? 'bg-[#0f0f1a]/95 backdrop-blur-lg shadow-lg'
		: 'bg-[#0f0f1a]/90 backdrop-blur-md'}"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center py-4">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 group">
				<div
					class="w-10 h-10 bg-gradient-to-br from-[#4dd3ff] to-[#4dd36f] rounded-full flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-[#4dd3ff]/50 transition-shadow"
				>
					J²
				</div>
				<span class="text-lg font-semibold text-white hidden sm:block"
					>J²it: IT and Web Solutions</span
				>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden lg:flex items-center gap-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-white/80 hover:text-[#4dd3ff] transition-colors relative group {$page.url
							.pathname === link.href
							? 'text-[#4dd3ff]'
							: ''}"
					>
						{link.label}
						{#if $page.url.pathname === link.href}
							<span
								class="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4dd3ff] to-[#4dd36f]"
							></span>
						{/if}
					</a>
				{/each}

				{#if $scheduleCallEnabled}
					<a href="/contact#schedule" class="btn-primary !py-2.5 !px-6 !text-sm"> Schedule Call </a>
				{/if}
			</div>

			<!-- Mobile Menu Button -->
			<button
				on:click={toggleMobileMenu}
				class="lg:hidden relative w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-200 {mobileMenuOpen
					? 'bg-white/5'
					: ''}"
				aria-label="Toggle menu"
			>
				<span class="sr-only">Toggle menu</span>
				<div
					class="w-6 flex flex-col gap-1.5 transition-transform duration-300 {mobileMenuOpen
						? 'scale-90'
						: ''}"
				>
					<span
						class="block h-0.5 bg-white transition-all duration-300 {mobileMenuOpen
							? 'rotate-45 translate-y-2'
							: ''}"
					></span>
					<span
						class="block h-0.5 bg-white transition-all duration-300 {mobileMenuOpen
							? 'opacity-0'
							: ''}"
					></span>
					<span
						class="block h-0.5 bg-white transition-all duration-300 {mobileMenuOpen
							? '-rotate-45 -translate-y-2'
							: ''}"
					></span>
				</div>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div
			class="lg:hidden absolute top-full left-0 right-0 bg-[#1a1a2e]/98 backdrop-blur-lg border-t border-white/10 shadow-xl overflow-hidden"
			transition:slide={{ duration: 300, easing: quintOut }}
		>
			<div class="px-4 py-6 space-y-4">
				{#each navLinks as link, i}
					<a
						href={link.href}
						on:click={closeMobileMenu}
						class="block py-2 px-4 text-white/80 hover:text-[#4dd3ff] hover:bg-white/5 rounded-lg transition-all {$page
							.url.pathname === link.href
							? 'text-[#4dd3ff] bg-white/5'
							: ''}"
						in:fly={{ y: -20, duration: 300, delay: i * 50, easing: quintOut }}
						out:fade={{ duration: 150 }}
					>
						{link.label}
					</a>
				{/each}

				<div
					class="pt-4 border-t border-white/10"
					in:fly={{ y: -20, duration: 300, delay: navLinks.length * 50 + 100, easing: quintOut }}
					out:fade={{ duration: 150 }}
				>
					{#if $scheduleCallEnabled}
						<a
							href="/contact#schedule"
							on:click={closeMobileMenu}
							class="btn-primary block text-center !text-sm"
						>
							Schedule Call
						</a>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</nav>

<!-- Spacer for fixed nav -->
<div class="h-16"></div>

<style>
	nav {
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}
</style>

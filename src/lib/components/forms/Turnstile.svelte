<script>
	import { onMount, onDestroy } from 'svelte';
	import { env } from '$env/dynamic/public';

	// Reset the widget after a failed submission so the single-use token
	// is replaced; otherwise a retry reuses a spent token and fails again.
	export let resetKey = 0;

	const siteKey = env.PUBLIC_TURNSTILE_SITE_KEY;

	let container;
	let widgetId = null;
	let scriptLoaded = false;

	const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

	function loadScript() {
		if (window.turnstile) return Promise.resolve();

		const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
		if (existing) {
			return new Promise((resolve) => existing.addEventListener('load', resolve, { once: true }));
		}

		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = SCRIPT_SRC;
			script.async = true;
			script.defer = true;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	function render() {
		if (!window.turnstile || !container || widgetId !== null) return;
		widgetId = window.turnstile.render(container, {
			sitekey: siteKey,
			theme: 'dark',
			action: 'submit-form'
		});
	}

	onMount(async () => {
		if (!siteKey) return;

		try {
			await loadScript();
			scriptLoaded = true;
			render();
		} catch (error) {
			console.error('Turnstile: failed to load widget script', error);
		}
	});

	onDestroy(() => {
		if (widgetId !== null && window.turnstile) {
			window.turnstile.remove(widgetId);
			widgetId = null;
		}
	});

	// Reset on demand once the widget exists
	$: if (resetKey && widgetId !== null && typeof window !== 'undefined' && window.turnstile) {
		window.turnstile.reset(widgetId);
	}
</script>

{#if siteKey}
	<div class="flex justify-center" bind:this={container}></div>
	{#if !scriptLoaded}
		<p class="text-center text-xs text-white/40">Loading verification…</p>
	{/if}
{/if}

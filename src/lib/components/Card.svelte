<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	export let cardInfo;
	export let cardId = 'default';

	let mounted = false;
	let imageLoaded = false;

	// Generate the correct URL for this card
	$: cardUrl =
		cardId === 'default' ? `${cardInfo.website}/card` : `${cardInfo.website}/card/${cardId}`;

	onMount(() => {
		mounted = true;
	});

	function handleImageLoad() {
		imageLoaded = true;
	}

	function generateVCard() {
		const vcard = [
			'BEGIN:VCARD',
			'VERSION:3.0',
			`FN:${cardInfo.person}`,
			`ORG:${cardInfo.company}`,
			`TITLE:${cardInfo.title}`,
			`EMAIL:${cardInfo.email}`,
			`URL:${cardInfo.website}`,
			`ADR:;;${cardInfo.address.street};${cardInfo.address.city};${cardInfo.address.state};${cardInfo.address.zip};${cardInfo.address.country}`,
			`NOTE:${cardInfo.description}`,
			'END:VCARD'
		].join('\n');

		const blob = new Blob([vcard], { type: 'text/vcard' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${cardInfo.name.replace(/[^a-zA-Z0-9]/g, '_')}.vcf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	}

	function shareContact() {
		if (navigator.share) {
			const vcard = [
				'BEGIN:VCARD',
				'VERSION:3.0',
				`FN:${cardInfo.person}`,
				`ORG:${cardInfo.company}`,
				`TITLE:${cardInfo.title}`,
				`EMAIL:${cardInfo.email}`,
				`URL:${cardInfo.website}`,
				`ADR:;;${cardInfo.address.street};${cardInfo.address.city};${cardInfo.address.state};${cardInfo.address.zip};${cardInfo.address.country}`,
				`NOTE:${cardInfo.description}`,
				'END:VCARD'
			].join('\n');

			const blob = new Blob([vcard], { type: 'text/vcard' });
			const file = new File([blob], `${cardInfo.name.replace(/[^a-zA-Z0-9]/g, '_')}.vcf`, {
				type: 'text/vcard'
			});

			navigator
				.share({
					title: `${cardInfo.person} - Contact Card`,
					text: `Add ${cardInfo.person} from ${cardInfo.company} to your contacts`,
					files: [file]
				})
				.catch((err) => {
					console.log('Error sharing:', err);
					generateVCard(); // Fallback to download
				});
		} else {
			generateVCard(); // Fallback to download
		}
	}
</script>

{#if mounted}
	<div
		class="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#0f0f1a] to-[#16161f] card-page flex items-center justify-center p-4 lg:h-screen lg:overflow-hidden"
	>
		<div class="w-full max-w-4xl my-auto">
			<!-- Business Card -->
			<div class="relative">
				<!-- Animated gradient border -->
				<div
					class="absolute -inset-1 bg-gradient-to-br from-[#4dd3ff] via-[#4dd36f] to-[#ff4d8f] rounded-3xl blur opacity-75 animate-[gradient-rotate_4s_ease_infinite]"
				></div>

				<!-- Card content -->
				<div class="relative bg-[#1a1a2e] rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10">
					<div class="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-stretch">
						<!-- Left Column: Profile Image and Basic Info -->
						<div
							class="flex-shrink-0 flex flex-col items-center justify-center text-center lg:w-[340px]"
						>
							<!-- Profile Picture -->
							<div class="w-48 h-48 lg:w-56 lg:h-56 mb-4 lg:mb-6 relative">
								<img
									src={cardInfo.image}
									alt={cardInfo.person}
									class="w-48 h-48 lg:w-56 lg:h-56 rounded-full object-cover {imageLoaded
										? ''
										: 'opacity-0'} border-4 border-[#4dd36f]/50"
									on:load={handleImageLoad}
								/>
								{#if !imageLoaded}
									<div
										class="absolute inset-0 w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-[#4dd3ff]/20 to-[#4dd36f]/20 animate-pulse"
									></div>
								{/if}
							</div>

							<!-- Name and Title -->
							<h1 class="text-2xl sm:text-3xl font-bold mb-2">{cardInfo.person}</h1>
							<p class="text-lg sm:text-xl text-[#4dd36f] mb-1">{cardInfo.title}</p>
							<p class="text-base sm:text-lg text-white/70 mb-4 lg:mb-6">{cardInfo.company}</p>

							<!-- Action Buttons -->
							<div class="space-y-3 w-full max-w-[280px]">
								<button
									on:click={shareContact}
									class="w-full btn-primary inline-flex items-center justify-center gap-2 !py-3 !text-base"
								>
									<Icon icon="heroicons:plus-circle" class="w-6 h-6" />
									Add to Contacts
								</button>

								<button
									on:click={generateVCard}
									class="w-full btn-secondary inline-flex items-center justify-center gap-2 !py-3 !text-base"
								>
									<Icon icon="heroicons:arrow-down-tray" class="w-6 h-6" />
									Download Contact
								</button>
							</div>
						</div>

						<!-- Right Column: Contact Info and Details -->
						<div class="flex-1">
							<!-- Contact Info -->
							<div class="space-y-3 mb-6">
								{#if cardInfo.email}
									<a
										href="mailto:{cardInfo.email}"
										class="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
									>
										<div
											class="w-10 h-10 bg-gradient-to-br from-[#4dd3ff] to-[#4158D0] rounded-lg flex items-center justify-center"
										>
											<Icon icon="heroicons:envelope" class="w-5 h-5 text-white" />
										</div>
										<div class="text-left">
											<p class="font-medium text-white leading-tight" style="font-size: 1.5rem;">
												Email
											</p>
											<p class="text-white/60" style="font-size: 1.3rem; margin-top: 0.25rem;">
												{cardInfo.email}
											</p>
										</div>
									</a>
								{/if}

								{#if cardInfo.phone}
									<a
										href="tel:{cardInfo.phone}"
										class="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
									>
										<div
											class="w-10 h-10 bg-gradient-to-br from-[#4dd36f] to-[#3fb55f] rounded-lg flex items-center justify-center"
										>
											<Icon icon="heroicons:phone" class="w-5 h-5 text-white" />
										</div>
										<div class="text-left">
											<p class="font-medium text-white leading-tight" style="font-size: 1.5rem;">
												Phone
											</p>
											<p class="text-white/60" style="font-size: 1.3rem; margin-top: 0.25rem;">
												{cardInfo.phone}
											</p>
										</div>
									</a>
								{/if}

								{#if cardInfo.website}
									<a
										href={cardInfo.website}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
									>
										<div
											class="w-10 h-10 bg-gradient-to-br from-[#4dd36f] to-[#3fb55f] rounded-lg flex items-center justify-center"
										>
											<Icon icon="heroicons:globe-alt" class="w-5 h-5 text-white" />
										</div>
										<div class="text-left">
											<p class="font-medium text-white leading-tight" style="font-size: 1.5rem;">
												Website
											</p>
											<p class="text-white/60" style="font-size: 1.3rem; margin-top: 0.25rem;">
												{cardInfo.website}
											</p>
										</div>
									</a>
								{/if}

								<div class="flex items-center gap-3 p-3 rounded-xl bg-white/5">
									<div
										class="w-10 h-10 bg-gradient-to-br from-[#ff4d8f] to-[#C850C0] rounded-lg flex items-center justify-center"
									>
										<Icon icon="heroicons:map-pin" class="w-5 h-5 text-white" />
									</div>
									<div class="text-left">
										<p class="font-medium text-white leading-tight" style="font-size: 1.5rem;">
											Location
										</p>
										<p class="text-white/60" style="font-size: 1.3rem; margin-top: 0.25rem;">
											{cardInfo.address.city}, {cardInfo.address.state}
										</p>
									</div>
								</div>
							</div>

							<!-- Description -->
							<div class="p-4 bg-white/5 rounded-xl mb-4">
								<p class="text-sm text-white/80 leading-relaxed">
									{cardInfo.description}
								</p>
							</div>

							<!-- QR Code -->
							<div class="text-center p-3 bg-white/5 rounded-xl">
								<p class="text-xs text-white/50 mb-2">Share this card</p>
								<div
									class="w-20 h-20 bg-white/10 rounded-lg mx-auto flex items-center justify-center mb-2"
								>
									<Icon icon="heroicons:qr-code" class="w-12 h-12 text-white/30" />
								</div>
								<p class="text-xs text-white/40">{cardUrl}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Smart scroll handling - allow vertical scroll on mobile, prevent on desktop */
	@media (min-width: 1024px) {
		:global(html),
		:global(body) {
			overflow: hidden !important;
			height: 100vh !important;
		}
	}

	/* Prevent horizontal scroll always */
	:global(html),
	:global(body) {
		overflow-x: hidden !important;
		width: 100vw !important;
	}

	/* Hide navigation and footer on this page */
	:global(nav),
	:global(header nav),
	:global(.navigation),
	:global(footer) {
		display: none !important;
	}

	/* Hide Tawk.to widget on this page */
	:global(#tawk-widget-container),
	:global([id^='tawk']),
	:global(.tawk-widget),
	:global(iframe[title*='chat']),
	:global(iframe[src*='tawk']) {
		display: none !important;
	}

	/* Override the global p + p margin for the card page */
	:global(.card-page p + p) {
		margin-top: 0.02rem !important;
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
</style>

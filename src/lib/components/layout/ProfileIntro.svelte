<script>
	import { PUBLIC_CDN_URL } from '$env/static/public';
	import { currentSection, scrollDirection } from '$lib/stores/sectionScroll.js';
	import { createSectionAnimation } from '$lib/utils/sectionAnimations.js';

	let imageLoaded = false;
	$: visible = $currentSection === 1 || $currentSection === -1; // Show on mobile when currentSection is -1

	$: animations = {
		profile: createSectionAnimation($scrollDirection, 'default'),
		text: createSectionAnimation($scrollDirection, 'default'),
		benefits: createSectionAnimation($scrollDirection, 'stagger')
	};

	function handleImageLoad() {
		imageLoaded = true;
	}
</script>

<section
	id="profile-intro"
	class="relative h-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
>
	<!-- Background gradient -->
	<div class="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a]"></div>

	<!-- Centered glow effect -->
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#4dd3ff]/10 via-[#4dd36f]/10 to-transparent blur-[100px] opacity-60"
	></div>

	{#if visible}
		<div class="relative z-10 max-w-5xl mx-auto">
			<div class="flex flex-col lg:flex-row items-center gap-12">
				<!-- Profile Card with Animated Ring -->
				<div
					class="flex flex-col items-center"
					in:animations.profile.in={animations.profile.inProps}
					out:animations.profile.out={animations.profile.outProps}
				>
					<div class="relative w-80 h-80 flex-shrink-0">
						<!-- Rotating gradient ring -->
						<div
							class="absolute inset-0 rounded-full bg-conic-gradient animate-[rotate_10s_linear_infinite] p-[3px]"
						>
							<div class="w-full h-full rounded-full bg-[#1a1a2e]"></div>
						</div>

						<!-- Glow effect -->
						<div
							class="absolute -inset-5 rounded-full bg-conic-gradient blur-[30px] opacity-50 animate-[rotate_10s_linear_infinite]"
						></div>

						<!-- Inner content with just the image -->
						<div
							class="absolute inset-[3px] rounded-full bg-[#1a1a2e] flex items-center justify-center p-8"
						>
							<img
								src="{PUBLIC_CDN_URL}/images/Jamaal_Photo.webp"
								alt="Jamaal Ephriam"
								class="w-64 h-64 rounded-full object-cover {imageLoaded ? '' : 'opacity-0'}"
								on:load={handleImageLoad}
								in:fade={{ duration: 600 }}
							/>
							{#if !imageLoaded}
								<div
									class="w-64 h-64 rounded-full bg-gradient-to-br from-[#4dd3ff]/20 to-[#4dd36f]/20 animate-pulse"
								></div>
							{/if}
						</div>
					</div>

					<!-- Name and subtitle below the circle -->
					<div class="text-center mt-6">
						<h3 class="text-2xl font-bold gradient-text">Jamaal Ephriam</h3>
						<p class="text-white/60 mt-2">IT Solutions Expert</p>
					</div>
				</div>

				<!-- Profile Text -->
				<div class="flex-1 text-center lg:text-left">
					<h2
						class="text-3xl sm:text-4xl font-bold mb-4"
						in:animations.text.in={animations.text.inProps}
						out:animations.text.out={animations.text.outProps}
					>
						Enterprise IT Protection at Small Business Prices
					</h2>

					<h3
						class="text-2xl font-semibold text-[#4dd3ff] mb-6"
						in:animations.text.in={{ ...animations.text.inProps, delay: 200 }}
						out:animations.text.out={animations.text.outProps}
					>
						Hi, I'm Jamaal.
					</h3>

					<div
						in:animations.text.in={{ ...animations.text.inProps, delay: 300 }}
						out:animations.text.out={animations.text.outProps}
					>
						<p class="text-xl sm:text-2xl text-white/70 mb-4">
							I provide enterprise-level IT protection scaled and priced for small businesses. No
							surprises, no hourly bills, just predictable monthly pricing that makes sense for your
							budget.
						</p>

						<p class="text-xl sm:text-2xl text-white/70 mb-6">
							No confusing tech jargon, no surprise bills, just reliable IT support that lets you
							focus on what you do best: running your business.
						</p>

						<!-- Key benefits -->
						<div class="grid sm:grid-cols-2 gap-4 mt-8">
							<div
								class="flex items-start gap-3 hover-lift-item transition-all duration-300 hover:transform hover:translateY(-2px) cursor-default"
							>
								<svg
									class="w-6 h-6 text-[#4dd36f] flex-shrink-0 mt-0.5"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
								<div>
									<p class="font-semibold text-white">Save $4000+/month</p>
									<p class="text-sm text-white/60">vs. hiring a full-time IT person</p>
								</div>
							</div>

							<div
								class="flex items-start gap-3 hover-lift-item transition-all duration-300 hover:transform hover:translateY(-2px) cursor-default"
							>
								<svg
									class="w-6 h-6 text-[#4dd36f] flex-shrink-0 mt-0.5"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
								<div>
									<p class="font-semibold text-white">Stop Emergency Bills</p>
									<p class="text-sm text-white/60">No more $200/hour crisis calls</p>
								</div>
							</div>

							<div
								class="flex items-start gap-3 hover-lift-item transition-all duration-300 hover:transform hover:translateY(-2px) cursor-default"
							>
								<svg
									class="w-6 h-6 text-[#4dd36f] flex-shrink-0 mt-0.5"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
								<div>
									<p class="font-semibold text-white">Predictable Budget</p>
									<p class="text-sm text-white/60">Fixed monthly investment</p>
								</div>
							</div>

							<div
								class="flex items-start gap-3 hover-lift-item transition-all duration-300 hover:transform hover:translateY(-2px) cursor-default"
							>
								<svg
									class="w-6 h-6 text-[#4dd36f] flex-shrink-0 mt-0.5"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
								<div>
									<p class="font-semibold text-white">ROI in First Month</p>
									<p class="text-sm text-white/60">Pays for itself by preventing issues</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	.bg-conic-gradient {
		background: conic-gradient(
			from 180deg at 50% 50%,
			#4dd3ff 0deg,
			#4dd36f 90deg,
			#ff4d8f 180deg,
			#4dd3ff 270deg,
			#4dd3ff 360deg
		);
	}

	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
	}

	/* Intermediate desktop resolution fixes */
	@media (min-width: 961px) and (max-width: 1400px) and (min-height: 800px) and (max-height: 1100px) {
		section {
			padding: 40px 20px !important;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			min-height: auto !important;
		}

		.relative.z-10.max-w-5xl {
			margin-top: 0;
			padding: 0;
		}

		.flex.flex-col.lg\\:flex-row {
			gap: 2rem !important;
			align-items: center;
		}

		/* Smaller profile container - maintain aspect ratio */
		.relative.w-80.h-80 {
			width: 240px !important;
			height: 240px !important;
		}

		/* Scale all inner elements proportionally */
		.relative.w-80.h-80 .absolute.inset-0 {
			width: 240px !important;
			height: 240px !important;
		}

		.relative.w-80.h-80 .absolute.-inset-5 {
			width: 260px !important;
			height: 260px !important;
			margin: -10px !important;
		}

		/* Inner content container */
		.relative.w-80.h-80 div[class*='inset-'] {
			padding: 6px !important;
		}

		/* Scale inner image to fit properly */
		.relative.w-80.h-80 img,
		.relative.w-80.h-80 .w-64.h-64 {
			width: 180px !important;
			height: 180px !important;
		}

		/* Text scaling - make main title larger */
		h2 {
			font-size: 3rem !important;
			line-height: 1.2 !important;
			margin-bottom: 1rem !important;
			font-weight: 700 !important;
		}

		h3 {
			font-size: 1.5rem !important;
			margin-bottom: 1rem !important;
		}

		p {
			font-size: 1.1rem !important;
			line-height: 1.4 !important;
			margin-bottom: 1rem !important;
		}

		/* Benefit grid adjustments */
		.grid {
			gap: 1rem !important;
			margin-top: 1.5rem !important;
		}

		.font-semibold {
			font-size: 1rem !important;
		}

		.text-sm {
			font-size: 0.875rem !important;
		}
	}

	/* Desktop with shorter heights */
	@media (min-width: 770px) and (max-height: 950px) {
		section {
			padding: 20px !important;
		}

		.relative.w-80.h-80 {
			width: 200px !important;
			height: 200px !important;
		}

		.relative.w-80.h-80 .absolute.inset-0 {
			width: 200px !important;
			height: 200px !important;
		}

		.relative.w-80.h-80 .absolute.-inset-5 {
			width: 220px !important;
			height: 220px !important;
			margin: -10px !important;
		}

		.relative.w-80.h-80 div[class*='inset-'] {
			padding: 5px !important;
		}

		.relative.w-80.h-80 img,
		.relative.w-80.h-80 .w-64.h-64 {
			width: 150px !important;
			height: 150px !important;
		}

		h2 {
			font-size: 1.75rem !important;
			margin-bottom: 0.75rem !important;
		}

		h3 {
			font-size: 1.25rem !important;
			margin-bottom: 0.75rem !important;
		}

		p {
			font-size: 1rem !important;
			margin-bottom: 0.75rem !important;
		}

		.grid {
			gap: 0.75rem !important;
			margin-top: 1rem !important;
		}
	}

	/* Very short heights */
	@media (min-width: 770px) and (max-height: 800px) {
		section {
			padding: 10px !important;
		}

		.relative.w-80.h-80 {
			width: 160px !important;
			height: 160px !important;
		}

		.relative.w-80.h-80 .absolute.inset-0 {
			width: 160px !important;
			height: 160px !important;
		}

		.relative.w-80.h-80 .absolute.-inset-5 {
			width: 180px !important;
			height: 180px !important;
			margin: -10px !important;
		}

		.relative.w-80.h-80 div[class*='inset-'] {
			padding: 4px !important;
		}

		.relative.w-80.h-80 img,
		.relative.w-80.h-80 .w-64.h-64 {
			width: 120px !important;
			height: 120px !important;
		}

		.flex.flex-col.lg\\:flex-row {
			gap: 1rem !important;
		}

		h2 {
			font-size: 1.5rem !important;
			margin-bottom: 0.5rem !important;
		}

		h3 {
			font-size: 1.125rem !important;
			margin-bottom: 0.5rem !important;
		}

		p {
			font-size: 0.875rem !important;
			margin-bottom: 0.5rem !important;
		}

		.grid {
			gap: 0.5rem !important;
			margin-top: 0.75rem !important;
		}

		.font-semibold {
			font-size: 0.875rem !important;
		}

		.text-sm {
			font-size: 0.75rem !important;
		}
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		/* Override universal padding rule with higher specificity */
		.full-page-section section,
		div.full-page-section section,
		section.relative.h-full.flex.items-center {
			padding: 0px !important; /* No padding on section */
			height: auto !important; /* Auto height to fit content */
			min-height: auto !important; /* Remove viewport height constraints */
			overflow: visible !important; /* Allow content to expand naturally */
		}

		/* Add padding to inner container */
		section > div {
			padding: 0px !important; /* Remove since we're applying padding to content container */
			overflow: visible !important; /* Allow content to expand naturally */
		}

		/* Content container padding - use your working approach */
		.relative.z-10.max-w-5xl {
			padding: 50px 20px 50px 20px !important; /* Your working solution */
		}

		/* Prevent profile image overflow */
		.relative.w-80.h-80 {
			width: 280px !important;
			height: 280px !important;
		}

		/* Center all grid items */
		.grid {
			justify-items: center;
			justify-content: center !important;
			width: 100%;
		}

		/* Stack benefit items vertically and center them */
		.grid {
			grid-template-columns: 1fr !important;
			gap: 1.5rem !important;
			max-width: 100% !important;
			margin: 0 auto;
			padding: 0;
			justify-content: center !important;
		}

		/* Center and improve benefit item layout */
		.flex.items-start {
			justify-content: flex-start !important;
			align-items: center !important;
			text-align: left !important;
			width: 100% !important;
			max-width: 100% !important;
		}

		/* Make titles larger with icons */
		.font-semibold {
			font-size: 2.1rem !important;
			font-weight: 600 !important;
			line-height: 1.2 !important;
		}

		/* SVG icons beside titles */
		.w-6.h-6 {
			width: 2rem !important;
			height: 2rem !important;
		}

		/* Larger subtext with reduced line height */
		.text-sm {
			font-size: 1.6rem !important;
			line-height: 1.3 !important;
		}

		/* Prevent text overflow */
		.flex-1.text-center {
			width: 100% !important;
			max-width: 100% !important;
			overflow: hidden !important;
		}
	}
</style>

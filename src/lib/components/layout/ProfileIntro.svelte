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
						Meet Your IT Partner
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
							I provide affordable IT support for small businesses that don't have a full-time IT
							person. For a flat monthly fee, I keep your computers secure, patched, and backed up.
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
									<p class="font-semibold text-white">Direct Support</p>
									<p class="text-sm text-white/60">Work directly with me, not a call center</p>
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
									<p class="font-semibold text-white">Plain English</p>
									<p class="text-sm text-white/60">No confusing technical jargon</p>
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
									<p class="font-semibold text-white">Fixed Pricing</p>
									<p class="text-sm text-white/60">No surprise bills or hidden fees</p>
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
									<p class="font-semibold text-white">Small Business Focus</p>
									<p class="text-sm text-white/60">Solutions that fit your size and budget</p>
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

	/* Mobile optimizations */
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
		.grid.sm\\:grid-cols-2 {
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

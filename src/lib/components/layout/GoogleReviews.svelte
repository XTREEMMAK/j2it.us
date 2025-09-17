<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';

	export let hideIfEmpty = true; // Allow parent to control visibility behavior
	export let hasReviews = true; // Bind to parent

	const dispatch = createEventDispatcher();

	let reviews = [];
	let businessRating = 0;
	let totalReviews = 0;
	let loading = true;
	let error = null;
	let apiConfigured = true;

	async function fetchReviews() {
		try {
			const response = await fetch('/api/google-reviews');
			const data = await response.json();

			if (response.ok) {
				reviews = data.highRatingReviews || [];
				businessRating = data.businessRating || 0;
				totalReviews = data.totalReviews || 0;
			} else {
				error = data.error || 'Failed to load reviews';
				// Check if API is not configured
				if (response.status === 500 && data.error === 'Google Places API not configured') {
					apiConfigured = false;
				}
			}
		} catch (err) {
			error = 'Unable to load reviews at this time';
			console.error('Reviews fetch error:', err);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchReviews();
	});

	// Determine if section should be visible
	$: shouldHide = hideIfEmpty && (!apiConfigured || (!loading && reviews.length === 0));

	// Update parent about visibility status
	$: if (!loading) {
		const newHasReviews = apiConfigured && reviews.length > 0;
		if (newHasReviews !== hasReviews) {
			hasReviews = newHasReviews;
			dispatch('reviewsVisibility', { hasReviews: newHasReviews });
		}
	}

	function renderStars(rating) {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push({
				filled: i <= rating,
				half: i - 0.5 === rating
			});
		}
		return stars;
	}

	function truncateText(text, maxLength = 150) {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	}
</script>

{#if !shouldHide}
	<section
		class="min-h-screen bg-[#0f0f1a] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
	>
		<div class="max-w-6xl mx-auto">
			<!-- Section Header -->
			<div class="text-center mb-16">
				<h2 class="text-4xl sm:text-5xl font-bold mb-6">
					<span class="gradient-text">What Our Clients Say</span>
				</h2>

				{#if !loading && !error}
					<div class="flex items-center justify-center gap-4 mb-4">
						<div class="flex items-center">
							{#each renderStars(businessRating) as star}
								<Icon
									icon="heroicons:star"
									class="w-6 h-6 {star.filled ? 'text-yellow-400' : 'text-gray-600'}"
								/>
							{/each}
						</div>
						<span class="text-xl font-semibold text-white">{businessRating.toFixed(1)}</span>
					</div>
					<p class="text-white/70 text-lg">
						Based on {totalReviews} Google reviews • {reviews.length} shown (4+ stars)
					</p>
				{/if}
			</div>

			{#if loading}
				<div class="text-center">
					<div class="inline-flex items-center gap-3">
						<div class="spinner"></div>
						<span class="text-white/70">Loading reviews...</span>
					</div>
				</div>
			{:else if error}
				<div class="text-center bg-red-500/10 border border-red-500/50 rounded-lg p-8">
					<Icon icon="heroicons:exclamation-triangle" class="w-12 h-12 text-red-400 mx-auto mb-4" />
					<p class="text-red-400">{error}</p>
				</div>
			{:else if reviews.length === 0}
				<div class="text-center">
					<p class="text-white/70">No high-rating reviews available at this time.</p>
				</div>
			{:else}
				<!-- Reviews Grid -->
				<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each reviews.slice(0, 6) as review}
						<div
							class="bg-[#1a1a2e] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
						>
							<!-- Review Header -->
							<div class="flex items-center justify-between mb-4">
								<div class="flex items-center gap-1">
									{#each renderStars(review.rating) as star}
										<Icon
											icon="heroicons:star"
											class="w-4 h-4 {star.filled ? 'text-yellow-400' : 'text-gray-600'}"
										/>
									{/each}
								</div>
								<span class="text-sm text-white/50">{review.relativeTimeDescription}</span>
							</div>

							<!-- Review Text -->
							<p class="text-white/90 mb-4 leading-relaxed">
								{truncateText(review.text)}
							</p>

							<!-- Author -->
							<div class="flex items-center gap-3">
								<div
									class="w-10 h-10 bg-gradient-to-br from-[#4dd3ff] to-[#4dd36f] rounded-full flex items-center justify-center"
								>
									<span class="text-white font-semibold">
										{review.authorName.charAt(0).toUpperCase()}
									</span>
								</div>
								<div>
									<p class="text-white font-medium">{review.authorName}</p>
									<p class="text-white/50 text-sm">Google Review</p>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Google Reviews Footer -->
				<div class="text-center mt-12">
					<a
						href="https://www.google.com/maps/place/?q=place_id:{process.env
							.GOOGLE_BUSINESS_PLACE_ID || ''}"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 px-6 py-3 rounded-lg transition-all duration-300"
					>
						<Icon icon="logos:google" class="w-5 h-5" />
						<span class="text-white">View all reviews on Google</span>
						<Icon icon="heroicons:arrow-top-right-on-square" class="w-4 h-4 text-white/70" />
					</a>
				</div>
			{/if}
		</div>
	</section>
{/if}

<style>
	.spinner {
		width: 24px;
		height: 24px;
		border: 3px solid transparent;
		border-top: 3px solid #4dd3ff;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.gradient-text {
		background: linear-gradient(135deg, #4dd3ff 0%, #4dd36f 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 200% 200%;
		animation: gradient-shift 3s ease-in-out infinite;
	}

	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
</style>

<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let submitting = false;
	let form;
	let mounted = false;
	let showOptionalFields = false;
	let errors = {};
	let generalError = '';

	// Get form data from page store (persisted on validation failure)
	$: formData = $page.form;
	$: if (formData?.errors) {
		errors = formData.errors;
		generalError = formData.error || '';
	}

	onMount(() => {
		mounted = true;
	});

	function handleSubmit() {
		// Clear errors when submitting
		errors = {};
		generalError = '';

		return async ({ result, update }) => {
			submitting = false;

			if (result.type === 'success') {
				form.reset();
				errors = {};
				generalError = '';
				// Redirect handled by server action
			} else if (result.type === 'failure') {
				// Extract errors from result
				if (result.data?.errors) {
					errors = result.data.errors;
				}
				if (result.data?.error) {
					generalError = result.data.error;
				}
			}

			await update();
		};
	}

	function toggleOptionalFields() {
		showOptionalFields = !showOptionalFields;
	}

	const benefits = [
		'How much downtime is actually costing you (usually $500-2000 per incident)',
		'Which security gaps could shut down your business',
		"Where you're overpaying for software you don't need",
		'Why your current IT approach costs more than professional support',
		'Exactly what proper IT support should cost for your size business',
		'Simple fixes you can implement immediately to reduce risks'
	];
</script>

{#if mounted}
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-8">
			<h1 class="text-3xl sm:text-4xl font-bold mb-4">
				Discover How Much Money
				<span class="gradient-text">Your IT Problems Are Really Costing You</span>
			</h1>
			<p class="text-xl text-white/70 mb-6">
				Free 15-minute assessment reveals hidden IT risks and shows you exactly how to fix them — whether you work with me or not
			</p>
		</div>

		<!-- What You'll Discover -->
		<div class="bg-[#1a1a2e] rounded-2xl p-8 mb-8">
			<h2 class="text-2xl font-bold mb-6 text-center">What You'll Learn:</h2>
			<div class="grid md:grid-cols-2 gap-4">
				{#each benefits as benefit, i}
					<div class="flex items-start gap-3">
						<div
							class="w-6 h-6 rounded-full bg-gradient-to-r from-[#4dd3ff] to-[#4dd36f] flex items-center justify-center flex-shrink-0 mt-0.5"
						>
							<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<p class="text-white/80">{benefit}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Form -->
		<div class="bg-[#1a1a2e] rounded-2xl p-8 shadow-2xl">
			<h3 class="text-2xl font-bold mb-6 text-center gradient-text">
				Claim Your Free IT Cost Analysis
			</h3>

			{#if generalError}
				<div class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
					<p class="text-sm">{generalError}</p>
				</div>
			{/if}

			<form
				bind:this={form}
				method="POST"
				use:enhance={handleSubmit}
				on:submit={() => (submitting = true)}
				class="space-y-6"
			>
				<div class="grid md:grid-cols-2 gap-6">
					<!-- Business Name -->
					<div>
						<label for="businessName" class="block text-sm font-medium text-white/90 mb-2">
							Business Name *
						</label>
						<input
							type="text"
							id="businessName"
							name="businessName"
							required
							value={formData?.values?.businessName || ''}
							class="w-full px-4 py-3 rounded-lg bg-white/5 border {errors.businessName
								? 'border-red-500'
								: 'border-white/20'} text-white placeholder-white/50 focus:border-[#4dd3ff] focus:bg-white/8 transition-all"
							placeholder="Your Company LLC"
						/>
						{#if errors.businessName}
							<p class="text-red-400 text-sm mt-1">{errors.businessName}</p>
						{/if}
					</div>

					<!-- Your Name -->
					<div>
						<label for="name" class="block text-sm font-medium text-white/90 mb-2">
							Your Name *
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							value={formData?.values?.name || ''}
							class="w-full px-4 py-3 rounded-lg bg-white/5 border {errors.name
								? 'border-red-500'
								: 'border-white/20'} text-white placeholder-white/50 focus:border-[#4dd3ff] focus:bg-white/8 transition-all"
							placeholder="John Doe"
						/>
						{#if errors.name}
							<p class="text-red-400 text-sm mt-1">{errors.name}</p>
						{/if}
					</div>
				</div>

				<!-- Email -->
				<div>
					<label for="email" class="block text-sm font-medium text-white/90 mb-2">
						Email Address *
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						value={formData?.values?.email || ''}
						class="w-full px-4 py-3 rounded-lg bg-white/5 border {errors.email
							? 'border-red-500'
							: 'border-white/20'} text-white placeholder-white/50 focus:border-[#4dd3ff] focus:bg-white/8 transition-all"
						placeholder="john@company.com"
					/>
					{#if errors.email}
						<p class="text-red-400 text-sm mt-1">{errors.email}</p>
					{/if}
				</div>

				<!-- Optional Fields Toggle -->
				<div class="border-t border-white/10 pt-6">
					<button
						type="button"
						on:click={toggleOptionalFields}
						class="text-[#4dd3ff] hover:text-[#4dd36f] transition-colors flex items-center gap-2"
					>
						<svg
							class="w-4 h-4 transition-transform {showOptionalFields ? 'rotate-180' : ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
						{showOptionalFields ? 'Hide' : 'Add'} additional details (optional)
					</button>
				</div>

				{#if showOptionalFields}
					<div class="space-y-6 border-t border-white/10 pt-6">
						<!-- Phone -->
						<div>
							<label for="phone" class="block text-sm font-medium text-white/90 mb-2">
								Phone Number
							</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								value={formData?.values?.phone || ''}
								class="w-full px-4 py-3 rounded-lg bg-white/5 border {errors.phone
									? 'border-red-500'
									: 'border-white/20'} text-white placeholder-white/50 focus:border-[#4dd3ff] focus:bg-white/8 transition-all"
								placeholder="(555) 123-4567"
							/>
							{#if errors.phone}
								<p class="text-red-400 text-sm mt-1">{errors.phone}</p>
							{/if}
						</div>

						<!-- Number of Computers -->
						<div>
							<label for="numberOfComputers" class="block text-sm font-medium text-white/90 mb-2">
								How many computers does your business have?
							</label>
							<select
								id="numberOfComputers"
								name="numberOfComputers"
								value={formData?.values?.numberOfComputers || ''}
								class="w-full px-4 py-3 rounded-lg bg-white/5 border {errors.numberOfComputers
									? 'border-red-500'
									: 'border-white/20'} text-white focus:border-[#4dd3ff] focus:bg-white/8 transition-all"
							>
								<option value="">Select number of computers</option>
								<option value="1-3">1-3 computers</option>
								<option value="4-6">4-6 computers</option>
								<option value="7-10">7-10 computers</option>
								<option value="11-20">11-20 computers</option>
								<option value="20+">More than 20 computers</option>
							</select>
							{#if errors.numberOfComputers}
								<p class="text-red-400 text-sm mt-1">{errors.numberOfComputers}</p>
							{/if}
						</div>

						<!-- Biggest Frustration -->
						<div>
							<label for="frustration" class="block text-sm font-medium text-white/90 mb-2">
								What's your biggest IT frustration right now?
							</label>
							<textarea
								id="frustration"
								name="frustration"
								rows="3"
								value={formData?.values?.frustration || ''}
								class="w-full px-4 py-3 rounded-lg bg-white/5 border {errors.frustration
									? 'border-red-500'
									: 'border-white/20'} text-white placeholder-white/50 focus:border-[#4dd3ff] focus:bg-white/8 transition-all resize-vertical"
								placeholder="Tell me what's been bothering you about your current IT setup..."
							></textarea>
							{#if errors.frustration}
								<p class="text-red-400 text-sm mt-1">{errors.frustration}</p>
							{/if}
						</div>
					</div>
				{/if}

				<!-- Submit button -->
				<div class="text-center pt-6">
					<button
						type="submit"
						disabled={submitting}
						class="btn-primary min-w-[300px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto !py-4 !text-lg"
					>
						{#if submitting}
							<div class="spinner"></div>
							<span>Processing...</span>
						{:else}
							<span>Get My Free IT Cost Analysis</span>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						{/if}
					</button>
				</div>

				<!-- Privacy and expectations -->
				<div class="bg-white/5 rounded-lg p-4 text-center">
					<p class="text-sm text-white/70 mb-2">
						<strong>What happens next?</strong>
					</p>
					<p class="text-xs text-white/60">
						I'll personally review your information and show you exactly how much you could save by switching to 
						professional IT support. Most businesses save $1000+ per month in prevented issues. No spam, no pressure — 
						just honest numbers based on your actual situation.
					</p>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid transparent;
		border-top: 2px solid currentColor;
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
</style>

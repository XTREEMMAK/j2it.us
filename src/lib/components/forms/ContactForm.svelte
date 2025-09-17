<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let title = 'Contact Me';
	export let showBusinessFields = true;

	let submitting = false;
	let form;
	let mounted = false;
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
</script>

{#if mounted}
	<div class="bg-[#1a1a2e] rounded-2xl p-8 shadow-2xl">
		<h3 class="text-2xl font-bold mb-6 text-center gradient-text">{title}</h3>

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
			<div class="grid {showBusinessFields ? 'md:grid-cols-2' : ''} gap-6">
				<!-- Name field -->
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

				<!-- Email field -->
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
			</div>

			<div class="grid {showBusinessFields ? 'md:grid-cols-2' : ''} gap-6">
				{#if showBusinessFields}
					<!-- Business Name field -->
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
				{/if}

				<!-- Phone field -->
				<div>
					<label for="phone" class="block text-sm font-medium text-white/90 mb-2">
						Phone Number {showBusinessFields ? '' : '*'}
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						required={!showBusinessFields}
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
			</div>

			<!-- Message field -->
			<div>
				<label for="message" class="block text-sm font-medium text-white/90 mb-2">
					{showBusinessFields ? 'How can I help your business?' : 'Message'} *
				</label>
				<textarea
					id="message"
					name="message"
					required
					rows="5"
					value={formData?.values?.message || ''}
					class="w-full px-4 py-3 rounded-lg bg-white/5 border {errors.message
						? 'border-red-500'
						: 'border-white/20'} text-white placeholder-white/50 focus:border-[#4dd3ff] focus:bg-white/8 transition-all resize-vertical"
					placeholder={showBusinessFields
						? "Tell me about your current IT challenges or what you'd like help with..."
						: 'Tell me how I can help you...'}
				></textarea>
				{#if errors.message}
					<p class="text-red-400 text-sm mt-1">{errors.message}</p>
				{/if}
			</div>

			<!-- Submit button -->
			<div class="text-center pt-4">
				<button
					type="submit"
					disabled={submitting}
					class="btn-primary min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
				>
					{#if submitting}
						<div class="spinner"></div>
						<span>Sending...</span>
					{:else}
						<span>Send Message</span>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							/>
						</svg>
					{/if}
				</button>
			</div>

			<!-- Privacy note -->
			<p class="text-xs text-white/50 text-center mt-4">
				Your information is secure and will only be used to respond to your inquiry. We never share
				your details with third parties.
			</p>
		</form>
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

</style>

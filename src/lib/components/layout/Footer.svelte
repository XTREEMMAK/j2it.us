<script>
	import { scheduleCallEnabled, insightsEnabled } from '$lib/stores/features.js';
	export let copyyear = new Date().getFullYear();
</script>

<footer class="relative bg-[#0b090a] border-t border-white/10 mt-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid md:grid-cols-4 gap-8">
			<!-- Company Info -->
			<div class="md:col-span-2">
				<div class="flex items-center gap-2 mb-4">
					<div
						class="w-10 h-10 bg-gradient-to-br from-[#4dd3ff] to-[#4dd36f] rounded-full flex items-center justify-center font-bold text-white"
					>
						J²
					</div>
					<span class="text-lg font-semibold">J²it: IT and Web Solutions</span>
				</div>
				<p class="text-white/60 text-sm mb-4">
					Affordable IT support for small businesses. Simple, reliable, worry-free technology
					management without the enterprise price tag.
				</p>
				<p class="text-white/40 text-xs">
					© {copyyear} J²it: IT and Web Solutions. All rights reserved.
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h3 class="font-semibold mb-4 text-white/90">Quick Links</h3>
				<ul class="space-y-2">
					<li>
						<a
							href="/services"
							class="text-white/60 hover:text-[#4dd3ff] transition-colors text-sm"
						>
							Services
						</a>
					</li>
					<li>
						<a
							href="/health-check"
							class="text-white/60 hover:text-[#4dd3ff] transition-colors text-sm"
						>
							Free IT Health Check
						</a>
					</li>
					{#if $insightsEnabled}
						<li>
							<a
								href="/insights"
								class="text-white/60 hover:text-[#4dd3ff] transition-colors text-sm"
							>
								Insights
							</a>
						</li>
					{/if}
					<li>
						<a href="/contact" class="text-white/60 hover:text-[#4dd3ff] transition-colors text-sm">
							Contact
						</a>
					</li>
				</ul>
			</div>

			<!-- Contact Info -->
			<div>
				<h3 class="font-semibold mb-4 text-white/90">Get In Touch</h3>
				<div class="space-y-2 text-sm text-white/60">
					<p>Coconut Creek, FL 33073</p>
					<a href="mailto:contact@j2it.us" class="hover:text-[#4dd3ff] transition-colors block">
						contact@j2it.us
					</a>
					{#if $scheduleCallEnabled}
						<a
							href="/contact#schedule"
							class="inline-block mt-4 text-[#4dd36f] hover:text-[#4dd3ff] transition-colors font-semibold"
						>
							Schedule a Free Consultation →
						</a>
					{/if}
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="mt-8 pt-8 border-t border-white/10">
			<div class="flex flex-col sm:flex-row justify-between items-center gap-4">
				<div class="flex flex-col sm:flex-row items-center gap-2">
					<p class="text-xs text-white/40">
						Website designed and developed by
						<a href="https://j2it.us" class="text-[#4dd3ff] hover:text-[#4dd36f] transition-colors"
							>J²it</a
						>
					</p>
					<span class="text-white/40 hidden sm:inline">•</span>
					<p class="text-xs text-white/40">Powered by dedication to small business success</p>
				</div>
				<div class="flex gap-6 text-xs">
					<a href="/privacy" class="text-white/40 hover:text-white/60 transition-colors">
						Privacy Policy
					</a>
					<a href="/terms" class="text-white/40 hover:text-white/60 transition-colors">
						Terms of Service
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>

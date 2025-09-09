<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	// Placeholder articles - in production, these would come from Directus
	const articles = [
		{
			id: 1,
			title: '5 Signs Your Business Needs Better IT Security',
			excerpt:
				"Don't wait for a security breach to realize your business is vulnerable. Learn the warning signs that indicate your IT security needs immediate attention.",
			date: '2025-01-02',
			readTime: '5 min read',
			category: 'Security'
		},
		{
			id: 2,
			title: 'How to Create an Effective Data Backup Strategy',
			excerpt:
				"A solid backup strategy is your business's safety net. Discover the 3-2-1 rule and how to implement it effectively for your small business.",
			date: '2024-12-28',
			readTime: '7 min read',
			category: 'Data Protection'
		},
		{
			id: 3,
			title: 'Why Remote Monitoring Saves Small Businesses Money',
			excerpt:
				"Proactive IT monitoring can prevent costly downtime and emergency repairs. Learn how remote monitoring works and why it's essential.",
			date: '2024-12-20',
			readTime: '6 min read',
			category: 'IT Management'
		},
		{
			id: 4,
			title: 'Common IT Mistakes That Cost Small Businesses',
			excerpt:
				'Avoid these expensive IT pitfalls that many small businesses fall into. Simple changes can save you thousands of dollars.',
			date: '2024-12-15',
			readTime: '8 min read',
			category: 'Best Practices'
		},
		{
			id: 5,
			title: 'When to Upgrade Your Business Technology',
			excerpt:
				"Is your old technology holding your business back? Learn the key indicators that it's time to invest in new systems.",
			date: '2024-12-10',
			readTime: '5 min read',
			category: 'Technology Planning'
		},
		{
			id: 6,
			title: 'Password Security for Small Business Teams',
			excerpt:
				"Weak passwords are a major security risk. Implement these simple strategies to dramatically improve your team's password security.",
			date: '2024-12-05',
			readTime: '4 min read',
			category: 'Security'
		}
	];

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>IT Insights & Tips - J²it: IT and Web Solutions</title>
	<meta
		name="description"
		content="Practical IT insights and tips for small businesses. Learn how to improve your technology, security, and operations with expert advice from J²it."
	/>
</svelte:head>

{#if mounted}
	<div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
		<!-- Background effects -->
		<div class="fixed inset-0 overflow-hidden pointer-events-none">
			<div
				class="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-radial from-[#4dd36f]/5 to-transparent rounded-full blur-3xl"
			></div>
			<div
				class="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-radial from-[#4dd3ff]/5 to-transparent rounded-full blur-3xl"
			></div>
		</div>

		<div class="relative z-10 max-w-6xl mx-auto">
			<!-- Header -->
			<div class="text-center mb-16" in:fly={{ y: 20, duration: 600 }}>
				<h1 class="text-4xl sm:text-5xl font-bold mb-6">
					IT Insights &
					<span class="gradient-text">Business Tips</span>
				</h1>
				<p class="text-xl text-white/70 max-w-3xl mx-auto">
					Practical advice to help your small business make smarter technology decisions, improve
					security, and avoid costly IT mistakes.
				</p>
			</div>

			<!-- Articles Grid -->
			<div class="grid lg:grid-cols-2 gap-8 mb-16">
				{#each articles as article, i}
					<article
						class="bg-[#1a1a2e] rounded-2xl p-8 hover:transform hover:-translate-y-1 transition-all duration-300 border border-white/5 hover:border-white/10"
						in:fly={{ y: 30, duration: 600, delay: 100 + i * 50 }}
					>
						<div class="flex items-center gap-3 mb-4">
							<span
								class="text-xs px-3 py-1 bg-gradient-to-r from-[#4dd3ff]/20 to-[#4dd36f]/20 text-[#4dd3ff] rounded-full border border-[#4dd3ff]/30"
							>
								{article.category}
							</span>
							<span class="text-white/50 text-sm">•</span>
							<time class="text-white/50 text-sm">{formatDate(article.date)}</time>
							<span class="text-white/50 text-sm">•</span>
							<span class="text-white/50 text-sm">{article.readTime}</span>
						</div>

						<h2 class="text-xl font-bold mb-3 hover:text-[#4dd3ff] transition-colors">
							{article.title}
						</h2>

						<p class="text-white/70 mb-6 leading-relaxed">
							{article.excerpt}
						</p>

						<a
							href="/insights/{article.id}"
							class="inline-flex items-center gap-2 text-[#4dd3ff] hover:text-[#4dd36f] transition-colors font-semibold"
						>
							Read Article
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</a>
					</article>
				{/each}
			</div>

			<!-- Newsletter Signup -->
			<div class="bg-[#1a1a2e] rounded-2xl p-8 text-center" in:fade={{ duration: 600, delay: 800 }}>
				<h2 class="text-2xl font-bold mb-4">Stay Updated</h2>
				<p class="text-white/70 mb-6 max-w-2xl mx-auto">
					Get the latest IT tips and insights delivered to your inbox. No spam, just practical
					advice to help your business succeed.
				</p>

				<form class="max-w-md mx-auto flex gap-4">
					<input
						type="email"
						placeholder="Enter your email"
						class="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-[#4dd3ff] focus:bg-white/8 transition-all"
					/>
					<button type="submit" class="btn-primary whitespace-nowrap"> Subscribe </button>
				</form>

				<p class="text-xs text-white/50 mt-3">Unsubscribe anytime. We respect your privacy.</p>
			</div>

			<!-- Call to Action -->
			<div class="text-center mt-16" in:fade={{ duration: 600, delay: 900 }}>
				<h2 class="text-3xl font-bold mb-6">Need Personalized IT Advice?</h2>
				<p class="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
					While these articles provide general guidance, every business is unique. Let's discuss
					your specific IT challenges and opportunities.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a href="/health-check" class="btn-primary"> Get Your Free IT Health Check </a>
					<a href="/contact" class="btn-secondary"> Schedule a Consultation </a>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
	}
</style>

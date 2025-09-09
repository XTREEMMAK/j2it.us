<script>
  import { onMount } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  
  let mounted = false;
  let servicesVisible = false;
  
  onMount(() => {
    mounted = true;
    
    // Set services visible after a short delay to ensure they show
    setTimeout(() => {
      servicesVisible = true;
    }, 100);
    
    // Intersection observer for services grid
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          servicesVisible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    // Wait for DOM to be ready
    setTimeout(() => {
      const servicesGrid = document.querySelector('.services-grid');
      if (servicesGrid) observer.observe(servicesGrid);
    }, 200);
    
    return () => observer.disconnect();
  });
  
  const services = [
    {
      icon: "heroicons:shield-check",
      title: "Managed IT Support",
      description: "Proactive monitoring and management of your IT infrastructure to prevent problems before they impact your business.",
      features: [
        "24/7 system monitoring",
        "Remote troubleshooting",
        "Regular maintenance",
        "Priority support"
      ]
    },
    {
      icon: "heroicons:lock-closed",
      title: "Security & Compliance",
      description: "Protect your business with enterprise-grade security solutions that fit your budget and compliance requirements.",
      features: [
        "Antivirus & anti-malware",
        "Firewall management", 
        "Security audits",
        "Compliance assistance"
      ]
    },
    {
      icon: "heroicons:document-duplicate",
      title: "Data Backup & Recovery",
      description: "Secure, automated backup solutions with fast recovery options to ensure your critical data is always protected.",
      features: [
        "Automated daily backups",
        "Cloud & local storage",
        "Fast recovery options",
        "Regular backup testing"
      ],
      disclaimer: "Backup pricing depends on the solution and data volume per endpoint. We’ll provide clear, upfront pricing before setup so you always know what you’ll pay, with no surprises."
    },
    {
      icon: "heroicons:cog-6-tooth",
      title: "System Maintenance",
      description: "Regular updates, patches, and maintenance to keep your systems running smoothly and securely.",
      features: [
        "Software updates",
        "Security patches",
        "Performance optimization",
        "Hardware maintenance"
      ]
    }
  ];
</script>

<svelte:head>
  <title>IT Services - J²it: IT and Web Solutions</title>
  <meta name="description" content="Comprehensive IT services for small businesses. Managed IT support, security, data backup, and system maintenance. Flat-rate pricing, no surprises." />
</svelte:head>

{#if mounted}
  <div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <!-- Background effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-[#4dd36f]/5 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-radial from-[#4dd3ff]/5 to-transparent rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16" in:fly={{ y: 20, duration: 600 }}>
        <h1 class="text-4xl sm:text-5xl font-bold mb-6">
          Complete IT Services for
          <span class="gradient-text">Small Businesses</span>
        </h1>
        <p class="text-2xl text-white/70 max-w-3xl mx-auto">
          Everything you need to keep your technology running smoothly, securely, and reliably. 
          One flat monthly rate, no surprises.
        </p>
      </div>
      
      <!-- Services Grid -->
      <div class="services-grid grid lg:grid-cols-2 gap-8 mb-16">
        {#if servicesVisible}
          {#each services as service, i}
            <div 
              class="bg-[#1a1a2e] rounded-2xl p-8 hover:transform hover:-translate-y-1 transition-all duration-300"
              in:scale={{ start: 0.8, duration: 600, delay: 200 + i * 150 }}
              out:scale={{ start: 1.1, duration: 400 }}
            >
            <div class="w-16 h-16 text-[#4dd3ff] mb-6">
              <Icon icon={service.icon} class="w-16 h-16" />
            </div>
            
            <h3 class="text-2xl font-bold mb-4">{service.title}</h3>
            <p class="text-lg text-white/70 mb-6">{service.description}</p>
            
            <ul class="space-y-2">
              {#each service.features as feature}
                <li class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-[#4dd36f]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-white/80">{feature}</span>
                </li>
              {/each}
            </ul>
            
            {#if service.disclaimer}
              <p class="mt-4 text-sm text-white/60 italic">
                *{service.disclaimer}
              </p>
            {/if}
          </div>
          {/each}
        {/if}
      </div>
      
      <!-- Pricing Section -->
      <div class="bg-[#1a1a2e] rounded-2xl p-8 text-center mb-16" in:fly={{ y: 30, duration: 600, delay: 500 }}>
        <h2 class="text-3xl font-bold mb-6">Simple, Transparent Pricing</h2>
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="bg-[#0b090a] rounded-xl p-6">
            <h3 class="text-xl font-semibold mb-4">Small Business Package</h3>
            <div class="text-4xl font-bold gradient-text mb-2">$400/month</div>
            <p class="text-white/60 mb-4">For up to 4 computers</p>
            <p class="text-white/70">Perfect for small offices and retail shops</p>
          </div>
          <div class="bg-[#0b090a] rounded-xl p-6">
            <h3 class="text-xl font-semibold mb-4">Per Computer</h3>
            <div class="text-4xl font-bold gradient-text mb-2">$100/month</div>
            <p class="text-white/60 mb-4">Per additional computer</p>
            <p class="text-white/70">Scale as your business grows</p>
          </div>
        </div>
        <p class="text-white/60 mt-6">No setup fees • No long-term contracts • No hidden costs</p>
      </div>
      
      <!-- CTA Section -->
      <div class="text-center" in:fade={{ duration: 600, delay: 600 }}>
        <h2 class="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p class="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
          Let's discuss your specific IT needs and how I can help your business run more smoothly.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/health-check" class="btn-primary inline-flex items-center gap-3">
            <Icon icon="heroicons:check-circle" class="w-7 h-7" />
            Get Your Free IT Health Check
          </a>
          <a href="/contact" class="btn-secondary inline-flex items-center gap-3">
            <Icon icon="heroicons:calendar-days" class="w-7 h-7" />
            Schedule a Consultation
          </a>
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
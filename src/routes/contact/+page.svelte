<script>
  import ContactForm from '$lib/components/forms/ContactForm.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { scheduleCallEnabled } from '$lib/stores/features.js';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    
    // Check if we should scroll to schedule section (only if enabled)
    if ($scheduleCallEnabled && $page.url.hash === '#schedule') {
      setTimeout(() => {
        document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  });
</script>

<svelte:head>
  <title>Contact J2 IT Solutions - Get Your Free IT Consultation</title>
  <meta name="description" content="Contact J2 IT Solutions for reliable, affordable IT support. Schedule your free consultation or get your IT health check today. Serving small businesses in Florida." />
</svelte:head>

{#if mounted}
  <div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Stop Worrying About IT?
        </h1>
        <p class="text-xl text-white/70 max-w-3xl mx-auto">
          Let's talk about your business and how I can help simplify your technology. 
          Choose the option that works best for you.
        </p>
      </div>
      
      <!-- Contact Options -->
      <div class="{$scheduleCallEnabled ? 'grid lg:grid-cols-2 gap-8' : 'max-w-3xl mx-auto'} mb-12">
        <!-- Direct Contact -->
        <div class="bg-[#1a1a2e] rounded-2xl p-8">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-br from-[#4dd3ff] to-[#4dd36f] rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="heroicons:chat-bubble-left-ellipsis" class="w-8 h-8 text-white" />
            </div>
            <h2 class="text-2xl font-bold mb-2">Send a Message</h2>
            <p class="text-white/70">
              Tell me about your business and IT needs. I'll get back to you within 24 hours.
            </p>
          </div>
          
          <ContactForm />
        </div>
        
        <!-- Schedule Section -->
        {#if $scheduleCallEnabled}
          <div id="schedule" class="bg-[#1a1a2e] rounded-2xl p-8">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-br from-[#4dd36f] to-[#ff4d8f] rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="heroicons:calendar-days" class="w-8 h-8 text-white" />
            </div>
            <h2 class="text-2xl font-bold mb-2">Schedule a Call</h2>
            <p class="text-white/70 mb-6">
              Book a free 20-minute consultation to discuss your IT needs directly.
            </p>
          </div>
          
          <!-- Calendar Integration Placeholder -->
          <div class="bg-white/5 rounded-xl p-8 text-center">
            <h3 class="text-lg font-semibold mb-4">Free 20-Minute IT Consultation</h3>
            <p class="text-white/60 mb-6">
              I'll learn about your business and current IT setup, then provide personalized recommendations.
            </p>
            
            <!-- Calendar Link/Button -->
            <a 
              href="https://calendly.com/j2it-solutions/it-consultation" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn-primary inline-flex items-center gap-3"
            >
              <Icon icon="heroicons:calendar-days" class="w-7 h-7" />
              Schedule Your Call
            </a>
            
            <p class="text-xs text-white/50 mt-4">
              Available Monday-Friday, 9 AM - 6 PM EST
            </p>
          </div>
          
          <!-- What to Expect -->
          <div class="mt-8 space-y-4">
            <h3 class="font-semibold text-white/90">What to expect:</h3>
            <div class="space-y-2">
              <div class="flex items-start gap-3">
                <Icon icon="heroicons:check-circle" class="w-5 h-5 text-[#4dd36f] mt-0.5 flex-shrink-0" />
                <p class="text-sm text-white/70">Quick overview of your current IT setup</p>
              </div>
              <div class="flex items-start gap-3">
                <Icon icon="heroicons:check-circle" class="w-5 h-5 text-[#4dd36f] mt-0.5 flex-shrink-0" />
                <p class="text-sm text-white/70">Identify immediate risks and opportunities</p>
              </div>
              <div class="flex items-start gap-3">
                <Icon icon="heroicons:check-circle" class="w-5 h-5 text-[#4dd36f] mt-0.5 flex-shrink-0" />
                <p class="text-sm text-white/70">Discuss how my services can help your business</p>
              </div>
              <div class="flex items-start gap-3">
                <Icon icon="heroicons:check-circle" class="w-5 h-5 text-[#4dd36f] mt-0.5 flex-shrink-0" />
                <p class="text-sm text-white/70">No pressure, no obligation — just helpful advice</p>
              </div>
            </div>
          </div>
        </div>
        {/if}
      </div>
      
      <!-- Alternative Contact Methods -->
      <div class="bg-[#1a1a2e] rounded-2xl p-8 text-center">
        <h2 class="text-2xl font-bold mb-6">Other Ways to Reach Me</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <div class="w-12 h-12 bg-gradient-to-br from-[#4dd3ff] to-[#4dd36f] rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon icon="heroicons:envelope" class="w-6 h-6 text-white" />
            </div>
            <h3 class="font-semibold mb-2">Email</h3>
            <a href="mailto:contact@j2it.us" class="text-[#4dd3ff] hover:text-[#4dd36f] transition-colors">
              contact@j2it.us
            </a>
          </div>
          
          <div>
            <div class="w-12 h-12 bg-gradient-to-br from-[#4dd36f] to-[#ff4d8f] rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon icon="heroicons:map-pin" class="w-6 h-6 text-white" />
            </div>
            <h3 class="font-semibold mb-2">Service Area</h3>
            <p class="text-white/70">
              Coconut Creek, FL<br>
              Remote support nationwide
            </p>
          </div>
          
          <div>
            <div class="w-12 h-12 bg-gradient-to-br from-[#ff4d8f] to-[#FFCC70] rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon icon="heroicons:clock" class="w-6 h-6 text-white" />
            </div>
            <h3 class="font-semibold mb-2">Response Time</h3>
            <p class="text-white/70">
              Usually within 24 hours<br>
              Emergency support available
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  
  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted}
<section class="max-w-3xl w-full" in:fly={{ y: 20, duration: 700, delay: 1200 }}>
  <div class="bg-white p-6 rounded-2xl shadow">
    <h3 class="text-xl font-semibold mb-6 text-center">Contact Me</h3>
    
    <!-- Embedded form -->
    <iframe
      id="j2it-contact"
      src="https://forms.j2it.us/forms/j2it-contact"
      style="border: none; width: 100%; min-height: 480px;"
      title="Contact form for J²it"
    ></iframe>
    <script
  type="text/javascript"
  src="https://forms.j2it.us/widgets/iframe.min.js"
  on:load={() => {
    if (typeof initEmbed === 'function') initEmbed('j2it-contact');
  }}
></script>
  </div>
</section>
{/if}

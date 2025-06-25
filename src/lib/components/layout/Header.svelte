<script>
  import { PUBLIC_CDN_URL } from '$env/static/public';

  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted}
  <header class="flex flex-col md:flex-row items-center gap-6 max-w-5xl w-full mb-10">
  <img
    src="{PUBLIC_CDN_URL}/images/Jamaal_Photo.webp"
    alt="Jamaal Ephriam"
    class="w-44 h-60 object-cover rounded-xl shadow-md"
    in:fly={{ y: 40, duration: 1500 }}
  />
  <div class="text-center md:text-left">
    <h1
      class="text-4xl font-bold"
      in:fly={{ x: 20, duration: 500, delay: 150 }}
    >
      J²it: IT and Web Solutions
    </h1>
    <h2
      class="text-lg text-gray-600 mt-2"
      in:fly={{ x: 20, duration: 500, delay: 300 }}
    >
      Reliable Tech Support for Small Businesses
    </h2>
  </div>
</header>


<section class="max-w-3xl w-full mb-10" in:fly={{ y: 20, duration: 700, delay: 500 }}>
      <div class="bg-white p-6 rounded-2xl shadow">
        <p class="text-base">
            Hi, I'm <strong>Jamaal Ephriam</strong>, the founder of <strong>J²it: IT and Web Solutions</strong>. I work directly with small businesses to take the stress out of managing technology. 
        </p>
        <br/>

        <p class="text-base">  
            Whether you're overwhelmed by day-to-day IT issues, need help setting up a secure and reliable infrastructure, or just want expert guidance without enterprise-level overhead, I'm here to help.
        </p>
        <br/>

        <p class="text-base">
            With J²it, you get a dedicated partner who understands your business, responds quickly, and delivers solutions that make sense for your size and budget.
        </p>
      </div>
</section>
{/if}
<script>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  
  let active = null;
  let mounted = false;

    onMount(() => {
        mounted = true;
    });

  const services = [
  {
    title: 'Managed IT Support',
    image: '/images/677870180.webp',
    description: 'Comprehensive IT support tailored to your business — from resolving daily issues to proactive system maintenance that keeps everything running smoothly.',
    color: 'bg-blue-50'
  },
  {
    title: 'Remote Monitoring & Patching',
    image: '/images/888337820.webp',
    description: '24/7 monitoring and automatic patch management to secure your systems and minimize downtime — before problems turn into headaches.',
    color: 'bg-green-50'
  },
  {
    title: 'Data Backup Solutions',
    image: '/images/76521625.webp',
    description: 'Automated, secure backups — both local and cloud-based — so your critical data is safe, recoverable, and always within reach.',
    color: 'bg-yellow-50'
  },
  {
    title: 'Network Setup & Troubleshooting',
    image: '/images/954827414.webp',
    description: 'Design and support for reliable wired and wireless networks, with fast troubleshooting to keep your team connected and productive.',
    color: 'bg-purple-50'
  },
  // {
  //   title: 'Office 365 / Google Workspace Admin',
  //   image: '/images/services/workspace.jpg',
  //   description: 'Configuration, user management, and security for Microsoft 365 or Google Workspace — optimized for your small business.',
  //   color: 'bg-red-50'
  // },
  {
    title: 'Small Business Tech Consulting',
    image: '/images/330388413.webp',
    description: 'Get expert, practical advice on IT strategy, growth planning, and tool selection — with solutions that match your size and goals.',
    color: 'bg-pink-50'
  }
];

</script>

<style>
  li:focus {
    outline: none;
  }
</style>
{#if mounted}
<section class="max-w-3xl w-full mb-10" in:fly={{ y: 20, duration: 700, delay: 900 }}>
  <div class="bg-white p-6 rounded-2xl shadow">
    <h3 class="text-xl font-semibold mb-4">Services Offered</h3>
    <ul class="space-y-2 text-base">
  {#each services as service, i (service.title)}
    <li
      class="flex flex-col rounded-xl cursor-pointer transition-all duration-200"
      on:click={() => active === i ? active = null : active = i}
      animate:flip
    >
      <div class="flex items-center p-3 group hover:bg-gray-50 rounded-xl">
        <span
          class="text-blue-600 mr-2 text-lg transform transition-transform duration-200 group-hover:scale-125"
        >✔</span>
        <span class="font-medium">{service.title}</span>
      </div>

      {#if active === i}
        <div
          class={`overflow-hidden transition-all duration-300 ease-in-out mt-2 p-4 rounded-xl ${service.color} shadow-inner`}
          in:fade={{ duration: 200 }}
        >
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={service.image}
              alt={service.title}
              class="w-full sm:w-40 h-auto rounded-lg shadow-md"
              in:fly={{ y: 20, duration: 300 }}
            />
            <p class="text-sm text-gray-700">{service.description}</p>
          </div>
        </div>
      {/if}
    </li>
  {/each}
</ul>
  </div>
</section>
{/if}

<script>
    import MyHeader from '$lib/components/layout/Header.svelte';
    import Services from '$lib/components/layout/Services.svelte';
</script>


<div class="bg-gray-50 text-gray-900 flex flex-col items-center p-6">
    <MyHeader />

    <Services />

    <section class="max-w-3xl w-full">
      <div class="bg-white p-6 rounded-2xl shadow">
        <h3 class="text-xl font-semibold mb-4">Contact Me</h3>
        <div class="space-y-2">
          <a href="mailto:you@example.com" class="block text-blue-600 hover:underline">📧 jamaal@j2it.us</a>
          <a href="tel:1234567890" class="block text-blue-600 hover:underline">📞 (754) 423-8730</a>
          <a href="https://calendly.com/yourlink" target="_blank" class="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">📅 Schedule a Call</a>
        </div>
      </div>
    </section>

 
</div>

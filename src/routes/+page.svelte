<script>
    import MyHeader from '$lib/components/layout/Header.svelte';
    import Services from '$lib/components/layout/Services.svelte';
    import Contact from '$lib/components/layout/Contact.svelte';
    import { fade } from 'svelte/transition';

</script>


<div in:fade={{ duration: 250 }} out:fade={{ duration: 200 }} class="bg-gray-50 text-gray-900 flex flex-col items-center p-6">
    <MyHeader />

    <Services />

    <Contact />

 
</div>

<script>
	import "../reset.css";
	import '../app.css';
	import { PUBLIC_CDN_URL } from '$env/static/public';

	import MyFooter from "$lib/components/layout/Footer.svelte";
	
	//let { children } = $props();
	const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "J²it: IT and Web Solutions",
    "url": "https://www.j2it.us",
    "image": `${PUBLIC_CDN_URL}/logo_plus_sub.webp`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3620 W Hillsboro Blvd",
      "addressLocality": "Coconut Creek",
      "addressRegion": "FL",
      "postalCode": "33073",
      "addressCountry": "US"
    }
  };
</script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
      body {
        font-family: 'Inter', sans-serif;
      }
</style>
	<!-- {@render children()} -->
<svelte:head>
  <title>J²it: IT and Web Solutions – Reliable Tech Support for Small Business</title>
  <meta name="description" content="J²it offers reliable IT support, web solutions, and consulting for small businesses, run by Jamaal Ephriam." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Open Graph -->
  <meta property="og:title" content="J²it: IT and Web Solutions" />
  <meta property="og:description" content="Reliable IT support and web solutions for small business by Jamaal Ephriam." />
  <meta property="og:image" content="{PUBLIC_CDN_URL}/images/Jamaal_Photo.webp" />
  <meta property="og:url" content="https://www.j2it.us" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="J²it: IT and Web Solutions" />
  <meta name="twitter:description" content="Reliable IT support and tech consulting for small business by Jamaal Ephriam." />
  <meta name="twitter:image" content="{PUBLIC_CDN_URL}/images/Jamaal_Photo.webp" />

  <!-- Structured Data (optional placeholder) -->
  <script type="application/ld+json">
    {@html JSON.stringify(structuredData)}
  </script>
</svelte:head>


<slot/>


<MyFooter copyyear=2025/>
<script>
	import Card from '$lib/components/Card.svelte';

	export let data;
</script>

<svelte:head>
	<title>Contact Card - {data.cardInfo.name}</title>
	<meta
		name="description"
		content="Add {data.cardInfo.person} to your contacts. {data.cardInfo.description}"
	/>
</svelte:head>

<Card cardInfo={data.cardInfo} cardId={data.cardId} />

<style>
	/* Component styles */
</style>

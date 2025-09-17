<script>
	export let size = 16;
</script>

<div
	class="spinner"
	style="width: {size}px; height: {size}px;"
	aria-label="Loading"
	role="status"
></div>

<style>
	.spinner {
		border: 2px solid transparent;
		border-top: 2px solid currentColor;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
</style>

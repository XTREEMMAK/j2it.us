import { PUBLIC_INSIGHTS_ENABLED } from '$env/static/public';
import { error, redirect } from '@sveltejs/kit';

export async function load() {
	// Check if insights are enabled
	if (PUBLIC_INSIGHTS_ENABLED !== 'true') {
		// Redirect to home page or show 404
		throw redirect(303, '/');

		// Alternative: throw a 404 error instead of redirecting
		// throw error(404, {
		//   message: 'Page not found'
		// });
	}

	// If enabled, continue loading the page
	return {};
}

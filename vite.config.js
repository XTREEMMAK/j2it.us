import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	// Load environment variables from .env files
	const env = loadEnv(mode, process.cwd(), '');
	
	return {
		plugins: [tailwindcss(), sveltekit()],
		define: {
			// Make environment variables available to the server
			'process.env.GOOGLE_PLACES_API_KEY': JSON.stringify(env.GOOGLE_PLACES_API_KEY),
			'process.env.GOOGLE_BUSINESS_PLACE_ID': JSON.stringify(env.GOOGLE_BUSINESS_PLACE_ID),
		}
	};
});

import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// No `define` for secrets: all configuration is read at runtime via $env/dynamic/*
// so the built artifact stays free of environment-specific values.
export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});

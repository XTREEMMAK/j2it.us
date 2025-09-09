import { writable } from 'svelte/store';
import { env } from '$env/dynamic/public';

// Feature toggles for site-wide functionality
// Controlled by PUBLIC_SCHEDULE_CALL_ENABLED environment variable
export const scheduleCallEnabled = writable(env.PUBLIC_SCHEDULE_CALL_ENABLED === 'true');

// Controlled by PUBLIC_INSIGHTS_ENABLED environment variable
export const insightsEnabled = writable(env.PUBLIC_INSIGHTS_ENABLED === 'true');

// Additional feature toggles can be added here
// export const chatEnabled = writable(true);
// export const newsletterEnabled = writable(true);
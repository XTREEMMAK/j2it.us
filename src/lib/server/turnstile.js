import { env } from '$env/dynamic/private';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Whether Turnstile is configured for this environment.
 * @returns {boolean}
 */
export function isTurnstileConfigured() {
	return Boolean(env.TURNSTILE_SECRET_KEY);
}

/**
 * Verify a Turnstile token with Cloudflare.
 *
 * Fails OPEN when no secret is configured: an environment that has not been
 * given keys yet should not silently drop every lead. Once TURNSTILE_SECRET_KEY
 * is set, verification is enforced and a missing/invalid token is rejected.
 *
 * @param {string|null} token - The cf-turnstile-response value from the form
 * @param {string} [clientIp] - Client IP, passed to Cloudflare as remoteip
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function verifyTurnstile(token, clientIp) {
	if (!isTurnstileConfigured()) {
		console.warn('Turnstile: TURNSTILE_SECRET_KEY is not set - skipping verification');
		return { success: true };
	}

	if (!token) {
		return { success: false, error: 'Please complete the verification challenge.' };
	}

	try {
		const body = new URLSearchParams({
			secret: env.TURNSTILE_SECRET_KEY,
			response: token
		});

		if (clientIp) {
			body.set('remoteip', clientIp);
		}

		const response = await fetch(VERIFY_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body
		});

		if (!response.ok) {
			throw new Error(`Turnstile responded with status ${response.status}`);
		}

		const result = await response.json();

		if (!result.success) {
			// Codes are diagnostic only - never surfaced to the user
			console.warn('Turnstile verification failed:', result['error-codes']);
			return { success: false, error: 'Verification failed. Please try again.' };
		}

		return { success: true };
	} catch (error) {
		// Cloudflare unreachable. Reject rather than wave traffic through, but
		// give the user a retryable message.
		console.error('Turnstile verification error:', error);
		return { success: false, error: 'Could not verify your request. Please try again.' };
	}
}

/**
 * Check the honeypot field. Real users never see or fill it, so any value
 * means a bot that blindly filled every input on the page.
 *
 * @param {FormData} formData
 * @returns {boolean} true if the submission looks like a bot
 */
export function isHoneypotTripped(formData) {
	const value = formData.get('company_website');
	return typeof value === 'string' && value.trim().length > 0;
}

import { json } from '@sveltejs/kit';
import { verifyWebhookToken } from '$lib/server/webhook.js';
import { checkRateLimit, getRateLimitInfo } from '$lib/server/rateLimiter.js';

/**
 * POST /api/webhook
 * Endpoint for receiving webhook requests with JWT authentication
 */
export async function POST({ request, getClientAddress }) {
	const clientIp = getClientAddress();

	// Check rate limit
	if (!checkRateLimit(`webhook:${clientIp}`, 20, 60000)) {
		// Allow 20 webhook calls per minute
		const info = getRateLimitInfo(`webhook:${clientIp}`, 20, 60000);
		return json(
			{
				success: false,
				error: 'Rate limit exceeded',
				rateLimitInfo: info
			},
			{ status: 429 }
		);
	}

	try {
		// Get authorization header
		const authHeader = request.headers.get('authorization');
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return json(
				{ success: false, error: 'Missing or invalid authorization header' },
				{ status: 401 }
			);
		}

		// Extract and verify JWT token
		const token = authHeader.substring(7);
		const decoded = verifyWebhookToken(token);

		if (!decoded) {
			return json({ success: false, error: 'Invalid or expired token' }, { status: 401 });
		}

		// Get request body
		const body = await request.json();

		// Process the webhook data here
		// You can add custom logic based on the webhook type
		console.log('Webhook received:', {
			decoded,
			body,
			clientIp
		});

		// Return success response
		return json({
			success: true,
			message: 'Webhook processed successfully',
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		console.error('Webhook error:', error);
		return json({ success: false, error: 'Internal server error' }, { status: 500 });
	}
}

/**
 * GET /api/webhook
 * Health check endpoint
 */
export async function GET() {
	return json({
		status: 'healthy',
		service: 'j2it-webhook',
		timestamp: new Date().toISOString()
	});
}

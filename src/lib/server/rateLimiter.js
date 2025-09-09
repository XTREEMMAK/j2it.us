import { RATE_LIMIT_WINDOW, RATE_LIMIT_MAX_REQUESTS } from '$env/static/private';

// In-memory store for rate limiting
const requestStore = new Map();

/**
 * Rate limiter implementation
 * @param {string} identifier - Unique identifier (IP address or user ID)
 * @param {number} maxRequests - Maximum requests allowed (default from env)
 * @param {number} windowMs - Time window in milliseconds (default from env)
 * @returns {boolean} - true if request is allowed, false if rate limited
 */
export function checkRateLimit(identifier, maxRequests = null, windowMs = null) {
	const max = maxRequests || parseInt(RATE_LIMIT_MAX_REQUESTS) || 10;
	const window = windowMs || parseInt(RATE_LIMIT_WINDOW) || 60000; // 1 minute default

	const now = Date.now();
	const windowStart = now - window;

	// Get or create request history for this identifier
	if (!requestStore.has(identifier)) {
		requestStore.set(identifier, []);
	}

	const requests = requestStore.get(identifier);

	// Filter out requests outside the current window
	const recentRequests = requests.filter((timestamp) => timestamp > windowStart);

	// Check if rate limit exceeded
	if (recentRequests.length >= max) {
		// Update the store with filtered requests
		requestStore.set(identifier, recentRequests);
		return false; // Rate limited
	}

	// Add current request timestamp
	recentRequests.push(now);
	requestStore.set(identifier, recentRequests);

	// Clean up old entries periodically (every 100 requests)
	if (Math.random() < 0.01) {
		cleanupOldEntries(window * 2);
	}

	return true; // Request allowed
}

/**
 * Get remaining requests for an identifier
 * @param {string} identifier
 * @param {number} maxRequests
 * @param {number} windowMs
 * @returns {Object} - { remaining, resetTime }
 */
export function getRateLimitInfo(identifier, maxRequests = null, windowMs = null) {
	const max = maxRequests || parseInt(RATE_LIMIT_MAX_REQUESTS) || 10;
	const window = windowMs || parseInt(RATE_LIMIT_WINDOW) || 60000;

	const now = Date.now();
	const windowStart = now - window;

	const requests = requestStore.get(identifier) || [];
	const recentRequests = requests.filter((timestamp) => timestamp > windowStart);

	const remaining = Math.max(0, max - recentRequests.length);
	const oldestRequest = recentRequests[0] || now;
	const resetTime = oldestRequest + window;

	return {
		remaining,
		resetTime,
		limit: max
	};
}

/**
 * Clean up old entries from the store
 * @param {number} maxAge - Maximum age of entries to keep (in milliseconds)
 */
function cleanupOldEntries(maxAge) {
	const now = Date.now();
	const cutoff = now - maxAge;

	for (const [identifier, requests] of requestStore.entries()) {
		const filtered = requests.filter((timestamp) => timestamp > cutoff);

		if (filtered.length === 0) {
			requestStore.delete(identifier);
		} else if (filtered.length !== requests.length) {
			requestStore.set(identifier, filtered);
		}
	}
}

/**
 * Reset rate limit for a specific identifier (useful for testing)
 * @param {string} identifier
 */
export function resetRateLimit(identifier) {
	requestStore.delete(identifier);
}

/**
 * Clear all rate limit data (useful for testing)
 */
export function clearAllRateLimits() {
	requestStore.clear();
}

import { PUBLIC_CDN_URL } from '$env/static/public';

/**
 * Get card configuration from environment variables
 * @param {string} id - Card ID (e.g., 'default', 'john', etc.)
 * @returns {Object|null} Card configuration object or null if not found
 */
export function getCardConfig(id = 'default') {
	const prefix = `CARD_${id.toUpperCase()}_`;

	// Check if this card configuration exists
	const name = process.env[`${prefix}NAME`];

	if (!name && id !== 'default') {
		// If no card found with this ID, return null
		return null;
	}

	// Return card configuration
	return {
		name: process.env[`${prefix}NAME`] || 'Business Name',
		person: process.env[`${prefix}PERSON`] || 'Your Name',
		title: process.env[`${prefix}TITLE`] || 'Your Title',
		company: process.env[`${prefix}COMPANY`] || 'J²it: IT and Web Solutions',
		phone: process.env[`${prefix}PHONE`] || '',
		email: process.env[`${prefix}EMAIL`] || 'contact@j2it.us',
		website: process.env[`${prefix}WEBSITE`] || 'https://j2it.us',
		address: {
			street: process.env[`${prefix}STREET`] || '',
			city: process.env[`${prefix}CITY`] || 'Miami',
			state: process.env[`${prefix}STATE`] || 'FL',
			zip: process.env[`${prefix}ZIP`] || '00000',
			country: process.env[`${prefix}COUNTRY`] || 'USA'
		},
		description:
			process.env[`${prefix}DESCRIPTION`] ||
			'Affordable IT support for small businesses. Simple, reliable, worry-free technology management without the enterprise price tag.',
		image: process.env[`${prefix}IMAGE`]
			? `${PUBLIC_CDN_URL}/images/${process.env[`${prefix}IMAGE`]}`
			: `${PUBLIC_CDN_URL}/images/Jamaal_Photo.webp`
	};
}

/**
 * Get all available card IDs from environment variables
 * @returns {string[]} Array of card IDs
 */
export function getAvailableCardIds() {
	const cardIds = new Set(['default']);

	// Find all unique card IDs from environment variables
	for (const key in process.env) {
		if (key.startsWith('CARD_')) {
			const parts = key.split('_');
			if (parts.length >= 3) {
				const id = parts[1].toLowerCase();
				cardIds.add(id);
			}
		}
	}

	return Array.from(cardIds);
}

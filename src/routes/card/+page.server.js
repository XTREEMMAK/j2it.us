import { getCardConfig } from '$lib/server/cards.js';

export async function load() {
	const cardInfo = getCardConfig('default');

	if (!cardInfo) {
		return {
			status: 404,
			error: new Error('Card configuration not found')
		};
	}

	return {
		cardInfo,
		cardId: 'default'
	};
}

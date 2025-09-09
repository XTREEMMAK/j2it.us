import { getCardConfig } from '$lib/server/cards.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { id } = params;
	const cardInfo = getCardConfig(id);

	if (!cardInfo) {
		throw error(404, {
			message: `Card with ID "${id}" not found`
		});
	}

	return {
		cardInfo,
		cardId: id
	};
}

import { env } from '$env/dynamic/private';
import { PUBLIC_CDN_URL } from '$env/static/public';

/**
 * Get card configuration from environment variables
 * @param {string} id - Card ID (e.g., 'default', 'john', etc.)
 * @returns {Object|null} Card configuration object or null if not found
 */
export function getCardConfig(id = 'default') {
  const prefix = `CARD_${id.toUpperCase()}_`;
  
  // Check if this card configuration exists
  const name = env[`${prefix}NAME`];
  
  if (!name && id !== 'default') {
    // If no card found with this ID, return null
    return null;
  }
  
  // Return card configuration
  return {
    name: env[`${prefix}NAME`] || 'Business Name',
    person: env[`${prefix}PERSON`] || 'Your Name',
    title: env[`${prefix}TITLE`] || 'Your Title',
    company: env[`${prefix}COMPANY`] || 'J²it: IT and Web Solutions',
    phone: env[`${prefix}PHONE`] || '',
    email: env[`${prefix}EMAIL`] || 'contact@j2it.us',
    website: env[`${prefix}WEBSITE`] || 'https://j2it.us',
    address: {
      street: env[`${prefix}STREET`] || '',
      city: env[`${prefix}CITY`] || 'Miami',
      state: env[`${prefix}STATE`] || 'FL',
      zip: env[`${prefix}ZIP`] || '00000',
      country: env[`${prefix}COUNTRY`] || 'USA'
    },
    description: env[`${prefix}DESCRIPTION`] || 'Affordable IT support for small businesses. Simple, reliable, worry-free technology management without the enterprise price tag.',
    image: env[`${prefix}IMAGE`] ? `${PUBLIC_CDN_URL}/images/${env[`${prefix}IMAGE`]}` : `${PUBLIC_CDN_URL}/images/Jamaal_Photo.webp`
  };
}

/**
 * Get all available card IDs from environment variables
 * @returns {string[]} Array of card IDs
 */
export function getAvailableCardIds() {
  const cardIds = new Set(['default']);
  
  // Find all unique card IDs from environment variables
  for (const key in env) {
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
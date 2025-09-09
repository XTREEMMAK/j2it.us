import {
	PUBLIC_CDN_URL,
	PUBLIC_BUSINESS_NAME,
	PUBLIC_BUSINESS_ALT_NAME,
	PUBLIC_BUSINESS_URL,
	PUBLIC_BUSINESS_DESCRIPTION,
	PUBLIC_BUSINESS_PHONE,
	PUBLIC_BUSINESS_EMAIL,
	PUBLIC_BUSINESS_PRICE_RANGE,
	PUBLIC_BUSINESS_STREET,
	PUBLIC_BUSINESS_CITY,
	PUBLIC_BUSINESS_STATE,
	PUBLIC_BUSINESS_ZIP,
	PUBLIC_BUSINESS_COUNTRY,
	PUBLIC_BUSINESS_LATITUDE,
	PUBLIC_BUSINESS_LONGITUDE,
	PUBLIC_FOUNDER_NAME,
	PUBLIC_FOUNDER_TITLE,
	PUBLIC_BUSINESS_AREA_SERVED,
	PUBLIC_BUSINESS_HOURS_DAYS,
	PUBLIC_BUSINESS_HOURS_OPEN,
	PUBLIC_BUSINESS_HOURS_CLOSE
} from '$env/static/public';

/**
 * Generate structured data for LocalBusiness schema
 * @returns {Object} LocalBusiness structured data object
 */
export function createLocalBusinessSchema() {
	// Parse days from comma-separated string
	const daysOfWeek = PUBLIC_BUSINESS_HOURS_DAYS ? PUBLIC_BUSINESS_HOURS_DAYS.split(',') : [];

	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: PUBLIC_BUSINESS_NAME,
		alternateName: PUBLIC_BUSINESS_ALT_NAME,
		url: PUBLIC_BUSINESS_URL,
		logo: `${PUBLIC_CDN_URL}/logo_plus_sub.webp`,
		image: `${PUBLIC_CDN_URL}/images/Jamaal_Photo.webp`,
		description: PUBLIC_BUSINESS_DESCRIPTION,
		address: {
			'@type': 'PostalAddress',
			streetAddress: PUBLIC_BUSINESS_STREET,
			addressLocality: PUBLIC_BUSINESS_CITY,
			addressRegion: PUBLIC_BUSINESS_STATE,
			postalCode: PUBLIC_BUSINESS_ZIP,
			addressCountry: PUBLIC_BUSINESS_COUNTRY
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: parseFloat(PUBLIC_BUSINESS_LATITUDE),
			longitude: parseFloat(PUBLIC_BUSINESS_LONGITUDE)
		},
		telephone: PUBLIC_BUSINESS_PHONE,
		email: PUBLIC_BUSINESS_EMAIL,
		priceRange: PUBLIC_BUSINESS_PRICE_RANGE,
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: daysOfWeek,
			opens: PUBLIC_BUSINESS_HOURS_OPEN,
			closes: PUBLIC_BUSINESS_HOURS_CLOSE
		},
		founder: {
			'@type': 'Person',
			name: PUBLIC_FOUNDER_NAME,
			jobTitle: PUBLIC_FOUNDER_TITLE
		},
		areaServed: {
			'@type': 'State',
			name: PUBLIC_BUSINESS_AREA_SERVED
		},
		serviceType: ['IT Support', 'Web Development', 'Computer Repair', 'Network Security'],
		paymentAccepted: ['Cash', 'Credit Card', 'Check'],
		currenciesAccepted: 'USD'
	};
}

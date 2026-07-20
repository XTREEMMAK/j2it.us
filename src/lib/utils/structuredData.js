import { env } from '$env/dynamic/public';

/**
 * Generate structured data for LocalBusiness schema
 * @returns {Object} LocalBusiness structured data object
 */
export function createLocalBusinessSchema() {
	// Parse days from comma-separated string
	const daysOfWeek = env.PUBLIC_BUSINESS_HOURS_DAYS
		? env.PUBLIC_BUSINESS_HOURS_DAYS.split(',')
		: [];

	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: env.PUBLIC_BUSINESS_NAME,
		alternateName: env.PUBLIC_BUSINESS_ALT_NAME,
		url: env.PUBLIC_BUSINESS_URL,
		logo: `${env.PUBLIC_CDN_URL}/logo_plus_sub.webp`,
		image: `${env.PUBLIC_CDN_URL}/images/Jamaal_Photo.webp`,
		description: env.PUBLIC_BUSINESS_DESCRIPTION,
		address: {
			'@type': 'PostalAddress',
			streetAddress: env.PUBLIC_BUSINESS_STREET,
			addressLocality: env.PUBLIC_BUSINESS_CITY,
			addressRegion: env.PUBLIC_BUSINESS_STATE,
			postalCode: env.PUBLIC_BUSINESS_ZIP,
			addressCountry: env.PUBLIC_BUSINESS_COUNTRY
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: parseFloat(env.PUBLIC_BUSINESS_LATITUDE),
			longitude: parseFloat(env.PUBLIC_BUSINESS_LONGITUDE)
		},
		telephone: env.PUBLIC_BUSINESS_PHONE,
		email: env.PUBLIC_BUSINESS_EMAIL,
		priceRange: env.PUBLIC_BUSINESS_PRICE_RANGE,
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: daysOfWeek,
			opens: env.PUBLIC_BUSINESS_HOURS_OPEN,
			closes: env.PUBLIC_BUSINESS_HOURS_CLOSE
		},
		founder: {
			'@type': 'Person',
			name: env.PUBLIC_FOUNDER_NAME,
			jobTitle: env.PUBLIC_FOUNDER_TITLE
		},
		areaServed: {
			'@type': 'State',
			name: env.PUBLIC_BUSINESS_AREA_SERVED
		},
		serviceType: ['IT Support', 'Web Development', 'Computer Repair', 'Network Security'],
		paymentAccepted: ['Cash', 'Credit Card', 'Check'],
		currenciesAccepted: 'USD'
	};
}

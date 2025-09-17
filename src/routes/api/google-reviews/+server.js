import { json } from '@sveltejs/kit';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_BUSINESS_PLACE_ID = process.env.GOOGLE_BUSINESS_PLACE_ID;

// Cache reviews for 24 hours to minimize API calls
let reviewsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function GET() {
	// Check if API credentials are configured
	if (!GOOGLE_PLACES_API_KEY || !GOOGLE_BUSINESS_PLACE_ID) {
		return json({ error: 'Google Places API not configured' }, { status: 500 });
	}

	// Check cache first
	const now = Date.now();
	if (reviewsCache && now - cacheTimestamp < CACHE_DURATION) {
		return json(reviewsCache);
	}

	try {
		// Fetch place details including reviews
		const url = `https://places.googleapis.com/v1/places/${GOOGLE_BUSINESS_PLACE_ID}?fields=reviews,rating,userRatingCount&key=${GOOGLE_PLACES_API_KEY}`;

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY
			}
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Google Places API Error:', response.status, response.statusText);
			throw new Error(`Google Places API error: ${response.status}`);
		}

		const data = await response.json();

		// Filter reviews to only show 4+ star reviews
		const highRatingReviews = data.reviews?.filter((review) => review.rating >= 4) || [];

		// Format reviews for frontend
		const formattedReviews = highRatingReviews.map((review) => ({
			rating: review.rating,
			text: review.text?.text || '',
			authorName: review.authorAttribution?.displayName || 'Anonymous',
			relativeTimeDescription: review.relativePublishTimeDescription || '',
			publishTime: review.publishTime || null
		}));

		// Prepare response with business info
		const reviewsData = {
			businessRating: data.rating || 0,
			totalReviews: data.userRatingCount || 0,
			highRatingReviews: formattedReviews,
			reviewCount: formattedReviews.length,
			lastUpdated: new Date().toISOString()
		};

		// Update cache
		reviewsCache = reviewsData;
		cacheTimestamp = now;

		return json(reviewsData);
	} catch (error) {
		console.error('Google Reviews API error:', error);
		return json({ error: 'Failed to fetch reviews' }, { status: 500 });
	}
}

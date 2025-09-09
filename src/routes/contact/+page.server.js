import { fail, redirect } from '@sveltejs/kit';
import * as v from 'valibot';
import DOMPurify from 'isomorphic-dompurify';
import { contactSchema } from '$lib/schemas/contact.js';
import { sendToWebhook } from '$lib/server/webhook.js';
import { N8N_CONTACT_WEBHOOK_URL } from '$env/static/private';

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const clientIp = getClientAddress();

		try {
			// Get form data
			const formData = await request.formData();
			const data = {
				name: formData.get('name'),
				email: formData.get('email'),
				phone: formData.get('phone') || '',
				businessName: formData.get('businessName'),
				message: formData.get('message')
			};

			// Validate with Valibot
			const validationResult = v.safeParse(contactSchema, data);

			if (!validationResult.success) {
				const errors = {};
				for (const issue of validationResult.issues) {
					const path = issue.path?.[0]?.key || 'form';
					errors[path] = issue.message;
				}
				return fail(400, { errors, values: data });
			}

			const validatedData = validationResult.output;

			// Sanitize text inputs
			const sanitizedData = {
				...validatedData,
				name: DOMPurify.sanitize(validatedData.name, { ALLOWED_TAGS: [] }),
				businessName: DOMPurify.sanitize(validatedData.businessName, { ALLOWED_TAGS: [] }),
				message: DOMPurify.sanitize(validatedData.message, { ALLOWED_TAGS: [] }),
				phone: validatedData.phone
					? DOMPurify.sanitize(validatedData.phone, { ALLOWED_TAGS: [] })
					: '',
				formType: 'contact'
			};

			// Send to webhook
			const webhookResult = await sendToWebhook(sanitizedData, clientIp, N8N_CONTACT_WEBHOOK_URL);

			if (!webhookResult.success) {
				console.error('Webhook failed:', webhookResult.error);
				return fail(500, {
					error: webhookResult.error,
					values: data
				});
			}

			// Redirect to thank you page
			throw redirect(303, '/thank-you?type=contact');
		} catch (error) {
			// Handle redirect
			if (error?.status === 303) {
				throw error;
			}

			console.error('Contact form error:', error);
			return fail(500, {
				error: 'Something went wrong. Please try again later.',
				values: data
			});
		}
	}
};

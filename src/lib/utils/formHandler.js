/**
 * Create a generic form submission handler
 * @param {Function} clearErrorsFn - Function to clear form errors
 * @returns {Function} Form submission handler function
 */
export function createFormHandler(clearErrorsFn) {
	return async ({ result, update }) => {
		if (result.type === 'success') {
			clearErrorsFn();
			// Redirect handled by server action
		} else if (result.type === 'failure') {
			// Errors handled by reactive page store
		}
		await update();
		return { submitting: false };
	};
}

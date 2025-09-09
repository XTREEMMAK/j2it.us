/**
 * Throttle a function to limit execution frequency
 * @param {Function} fn - Function to throttle
 * @param {number} delay - Minimum delay between executions in ms
 * @returns {Function} Throttled function
 */
export function throttle(fn, delay) {
	let lastCall = 0;
	let timeoutId = null;

	return function (...args) {
		const now = Date.now();

		if (now - lastCall >= delay) {
			lastCall = now;
			fn.apply(this, args);
		} else if (!timeoutId) {
			// Schedule a trailing call
			timeoutId = setTimeout(
				() => {
					lastCall = Date.now();
					timeoutId = null;
					fn.apply(this, args);
				},
				delay - (now - lastCall)
			);
		}
	};
}

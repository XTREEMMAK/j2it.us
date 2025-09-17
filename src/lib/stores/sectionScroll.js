import { writable, get } from 'svelte/store';

export const currentSection = writable(0);
export const isScrolling = writable(false);
export const sectionsCount = writable(4);
export const scrollDirection = writable('down');

let scrollTimeout;
let lastScrollTime = 0;
let wheelDelta = 0;

export function scrollToSection(index, direction = 'down') {
	if (typeof window === 'undefined') return;

	isScrolling.set(true);
	scrollDirection.set(direction);
	currentSection.set(index);

	const container = document.querySelector('.full-page-scroll-container');
	if (container) {
		const targetY = index * window.innerHeight;

		// Use CSS transform for smoother animation
		container.style.transform = `translateY(-${targetY}px)`;

		// Reset scroll position of the new section
		const newSection = document.querySelector(`[data-section="${index}"]`);
		if (newSection) {
			newSection.scrollTop = 0;
		}
	}

	clearTimeout(scrollTimeout);
	scrollTimeout = setTimeout(() => {
		isScrolling.set(false);
	}, 800);
}

export function setupSectionScrolling() {
	if (typeof window === 'undefined') return;

	const sections = document.querySelectorAll('[data-section]');
	if (!sections.length) return;

	// Don't override the sectionsCount - let SectionIndicator set it based on sectionNames

	// Initialize with first section visible
	setTimeout(() => {
		currentSection.set(0);
		const container = document.querySelector('.full-page-scroll-container');
		if (container) {
			container.style.transform = 'translateY(0px)';
		}
	}, 100);

	// Improved wheel handling with debouncing and sensitivity control
	function handleWheel(e) {
		// Get the current section element
		const currentSectionIndex = get(currentSection);
		const sectionElement = document.querySelector(`[data-section="${currentSectionIndex}"]`);

		if (sectionElement) {
			// Check if the section has scrollable content
			const hasScrollableContent = sectionElement.scrollHeight > sectionElement.clientHeight;
			const scrollTop = sectionElement.scrollTop;
			const scrollHeight = sectionElement.scrollHeight;
			const clientHeight = sectionElement.clientHeight;
			const isAtTop = scrollTop <= 0;
			const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

			// If section has scrollable content and we're not at boundaries, scroll within section
			if (hasScrollableContent) {
				if (e.deltaY > 0 && !isAtBottom) {
					// Scrolling down but not at bottom - scroll within section
					return; // Let default scrolling happen
				} else if (e.deltaY < 0 && !isAtTop) {
					// Scrolling up but not at top - scroll within section
					return; // Let default scrolling happen
				}
			}
		}

		// If we're here, either no scrollable content or at boundaries - handle section transition
		e.preventDefault();

		const now = Date.now();
		const timeDelta = now - lastScrollTime;

		// Accumulate wheel delta for better sensitivity control
		wheelDelta += Math.abs(e.deltaY);

		// Only trigger scroll if enough delta has accumulated and enough time has passed
		if (wheelDelta > 80 && timeDelta > 200) {
			const direction = e.deltaY > 0 ? 'down' : 'up';

			currentSection.update((current) => {
				const next = direction === 'down' ? current + 1 : current - 1;
				const bounded = Math.max(0, Math.min(get(sectionsCount) - 1, next));

				if (bounded !== current) {
					scrollToSection(bounded, direction);
					lastScrollTime = now;
					wheelDelta = 0;
				}

				return bounded;
			});
		}

		// Reset wheel delta if too much time has passed
		if (timeDelta > 200) {
			wheelDelta = 0;
		}
	}

	// Keyboard navigation
	function handleKeyDown(e) {
		// Skip if not arrow/page keys
		if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) return;

		// Get the current section element
		const currentSectionIndex = get(currentSection);
		const sectionElement = document.querySelector(`[data-section="${currentSectionIndex}"]`);

		if (sectionElement) {
			const hasScrollableContent = sectionElement.scrollHeight > sectionElement.clientHeight;
			const scrollTop = sectionElement.scrollTop;
			const scrollHeight = sectionElement.scrollHeight;
			const clientHeight = sectionElement.clientHeight;
			const isAtTop = scrollTop <= 0;
			const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

			// Handle scrollable content
			if (hasScrollableContent) {
				if ((e.key === 'ArrowDown' || e.key === 'PageDown') && !isAtBottom) {
					// Let default scrolling happen within section
					return;
				} else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && !isAtTop) {
					// Let default scrolling happen within section
					return;
				}
			}
		}

		// Handle section transitions
		const now = Date.now();
		if (now - lastScrollTime < 500) return; // Prevent too rapid navigation

		if (e.key === 'ArrowDown' || e.key === 'PageDown') {
			e.preventDefault();
			currentSection.update((current) => {
				const next = Math.min(get(sectionsCount) - 1, current + 1);
				if (next !== current) {
					scrollToSection(next, 'down');
					lastScrollTime = now;
				}
				return next;
			});
		} else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
			e.preventDefault();
			currentSection.update((current) => {
				const next = Math.max(0, current - 1);
				if (next !== current) {
					scrollToSection(next, 'up');
					lastScrollTime = now;
				}
				return next;
			});
		}
	}

	// Touch handling for mobile
	let touchStartY = 0;
	let touchStartTime = 0;

	function handleTouchStart(e) {
		touchStartY = e.touches[0].clientY;
		touchStartTime = Date.now();
	}

	function handleTouchEnd(e) {
		if (!touchStartY) return;

		const touchEndY = e.changedTouches[0].clientY;
		const touchDelta = touchStartY - touchEndY;
		const timeDelta = Date.now() - touchStartTime;

		// Only trigger if swipe is long enough and fast enough
		if (Math.abs(touchDelta) > 50 && timeDelta < 300) {
			const direction = touchDelta > 0 ? 'down' : 'up';

			currentSection.update((current) => {
				const next = direction === 'down' ? current + 1 : current - 1;
				const bounded = Math.max(0, Math.min(get(sectionsCount) - 1, next));

				if (bounded !== current) {
					scrollToSection(bounded, direction);
				}

				return bounded;
			});
		}

		touchStartY = 0;
	}

	// Add event listeners
	window.addEventListener('wheel', handleWheel, { passive: false });
	window.addEventListener('keydown', handleKeyDown);
	window.addEventListener('touchstart', handleTouchStart, { passive: true });
	window.addEventListener('touchend', handleTouchEnd, { passive: true });

	return () => {
		window.removeEventListener('wheel', handleWheel);
		window.removeEventListener('keydown', handleKeyDown);
		window.removeEventListener('touchstart', handleTouchStart);
		window.removeEventListener('touchend', handleTouchEnd);
	};
}

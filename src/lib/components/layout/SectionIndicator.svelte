<script>
	import {
		currentSection,
		sectionsCount,
		scrollToSection,
		isScrolling
	} from '$lib/stores/sectionScroll.js';

	const sectionNames = ['Home', 'About', 'Services', 'Process'];
	const DOT_SIZE = 12;
	const GAP_SIZE = 16;
	const ANIMATION_DURATION = 1200;

	// Update the store with the actual section count
	sectionsCount.set(sectionNames.length);

	let currentlyActiveSection = $currentSection;
	let isTransitioning = false;
	let capsuleData = null;

	// Calculate dot position within the navigation container
	const getDotPosition = (sectionIndex) => ({
		x: DOT_SIZE / 2,
		y: 8 + sectionIndex * (DOT_SIZE + GAP_SIZE)
	});

	// Handle dot click with capsule animation
	function handleDotClick(targetSection) {
		if (isTransitioning || targetSection === currentlyActiveSection) return;

		const fromPos = getDotPosition(currentlyActiveSection);
		const toPos = getDotPosition(targetSection);

		capsuleData = {
			x: fromPos.x,
			startY: fromPos.y,
			endY: toPos.y,
			distance: Math.abs(toPos.y - fromPos.y)
		};

		isTransitioning = true;
		scrollToSection(targetSection);

		// Reset animation state
		setTimeout(() => {
			isTransitioning = false;
			currentlyActiveSection = targetSection;
			capsuleData = null;
		}, ANIMATION_DURATION);
	}

	// Track section changes for non-click navigation (keyboard, wheel, etc.)
	$: if ($currentSection !== currentlyActiveSection && !isTransitioning) {
		currentlyActiveSection = $currentSection;
	}
</script>

<div class="section-indicator">
	{#each sectionNames as sectionName, sectionIndex}
		<div class="indicator-item">
			<button
				class="indicator-dot
               {!isTransitioning && $currentSection === sectionIndex ? 'active' : ''}
               {isTransitioning ? 'transitioning' : ''}"
				on:click={() => handleDotClick(sectionIndex)}
				aria-label="Go to {sectionName} section"
			></button>
			<span class="indicator-label">{sectionName}</span>
		</div>
	{/each}

	<!-- Capsule animation overlay -->
	{#if capsuleData && isTransitioning}
		<div
			class="capsule-overlay"
			style="
        --x: {capsuleData.x}px;
        --start-y: {capsuleData.startY}px;
        --end-y: {capsuleData.endY}px;
        --distance: {capsuleData.distance}px;
        --direction: {capsuleData.endY > capsuleData.startY ? 'down' : 'up'};
      "
		></div>
	{/if}
</div>

<style>
	.section-indicator {
		position: fixed;
		right: 2rem;
		top: 50%;
		transform: translateY(-50%);
		z-index: 50;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.indicator-item {
		position: relative;
		display: flex;
		align-items: center;
	}

	.indicator-label {
		position: absolute;
		right: 1rem;
		background: rgba(15, 15, 26, 0.95);
		color: white;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		white-space: nowrap;
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
	}

	.indicator-label::after {
		content: '';
		position: absolute;
		right: -6px;
		top: 50%;
		transform: translateY(-50%);
		width: 0;
		height: 0;
		border-left: 6px solid rgba(15, 15, 26, 0.95);
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
	}

	.indicator-item:hover .indicator-label {
		opacity: 1;
		visibility: visible;
		transform: translateX(-0.5rem);
	}

	.indicator-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.3);
		background: transparent;
		cursor: pointer;
		transition: all 0.5s ease;
		position: relative;
	}

	.indicator-dot::before {
		content: '';
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		background: linear-gradient(135deg, #4dd3ff, #4dd36f);
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: -1;
	}

	.indicator-dot:hover {
		border-color: rgba(255, 255, 255, 0.6);
		transform: scale(1.2);
	}

	.indicator-dot.active {
		background: linear-gradient(135deg, #4dd3ff, #4dd36f);
		border-color: transparent;
		box-shadow: 0 0 20px rgba(77, 211, 255, 0.5);
		transform: scale(1.2);
		transition: all 0.5s ease;
	}

	.indicator-dot.transitioning {
		/* Reset any scaling/animations during capsule transition */
		transform: scale(1) !important;
		animation: none !important;
		background: rgba(255, 255, 255, 0.3) !important;
		border-color: rgba(255, 255, 255, 0.3) !important;
		box-shadow: none !important;
	}

	.capsule-overlay {
		position: absolute;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(77, 211, 255, 0.8);
		z-index: 100;
		pointer-events: none;
	}

	.capsule-overlay[style*='--direction: down'] {
		animation: capsule-stretch-down 1.4s cubic-bezier(0.4, 0, 0.6, 1);
	}

	.capsule-overlay[style*='--direction: up'] {
		animation: capsule-stretch-up 1.4s cubic-bezier(0.4, 0, 0.6, 1);
	}

	@keyframes capsule-stretch-down {
		0% {
			/* Start as dot at source position */
			left: var(--x);
			top: var(--start-y);
			width: 12px;
			height: 12px;
			border-radius: 6px;
			transform: translate(-50%, -50%);
			background: linear-gradient(135deg, #4dd3ff, #4dd36f);
			opacity: 1;
		}
		5% {
			/* Ensure stable start position */
			left: var(--x);
			top: var(--start-y);
			width: 12px;
			height: 12px;
			border-radius: 6px;
			transform: translate(-50%, -50%);
			background: linear-gradient(135deg, #4dd3ff, #4dd36f);
			opacity: 1;
		}
		60% {
			/* Stretch downward - keep transform consistent, adjust top to compensate */
			left: var(--x);
			top: calc(var(--start-y) + var(--distance) / 2);
			width: 12px;
			height: var(--distance);
			border-radius: 6px;
			transform: translate(-50%, -50%);
			background: linear-gradient(180deg, rgba(77, 211, 255, 0.9), rgba(77, 211, 111, 0.9));
			opacity: 1;
		}
		90% {
			/* Move to destination while contracting */
			left: var(--x);
			top: var(--end-y);
			width: 12px;
			height: 16px;
			border-radius: 6px;
			transform: translate(-50%, -50%);
			background: linear-gradient(180deg, #4dd3ff, #4dd36f);
		}
		100% {
			/* Final dot at destination */
			left: var(--x);
			top: var(--end-y);
			width: 12px;
			height: 12px;
			border-radius: 6px;
			transform: translate(-50%, -50%);
			background: linear-gradient(135deg, #4dd3ff, #4dd36f);
		}
	}

	@keyframes capsule-stretch-up {
		0% {
			/* Start as dot at source position */
			left: var(--x);
			top: var(--start-y);
			width: 12px;
			height: 12px;
			border-radius: 6px;
			transform: translate(-50%, -50%);
			background: linear-gradient(135deg, #4dd3ff, #4dd36f);
			opacity: 1;
		}
		5% {
			/* Ensure stable start position */
			left: var(--x);
			top: var(--start-y);
			width: 12px;
			height: 12px;
			border-radius: 6px;
			transform: translate(-50%, -50%);
			background: linear-gradient(135deg, #4dd3ff, #4dd36f);
			opacity: 1;
		}
		60% {
			/* Stretch upward - keep transform consistent, adjust top to compensate */
			left: var(--x);
			top: calc(var(--start-y) - var(--distance) / 2);
			width: 12px;
			height: var(--distance);
			border-radius: 6px;
			transform: translate(-50%, -50%);
			background: linear-gradient(180deg, rgba(77, 211, 255, 0.9), rgba(77, 211, 111, 0.9));
			opacity: 1;
		}
		90% {
			/* Move to destination while contracting */
			left: var(--x);
			top: var(--end-y);
			width: 12px;
			height: 16px;
			border-radius: 6px;
			transform: translate(-50%, -50%);
			background: linear-gradient(180deg, #4dd3ff, #4dd36f);
		}
		100% {
			/* Final dot at destination */
			left: var(--x);
			top: var(--end-y);
			width: 12px;
			height: 12px;
			border-radius: 6px;
			transform: translate(-50%, -50%);
			background: linear-gradient(135deg, #4dd3ff, #4dd36f);
		}
	}

	.indicator-dot.active::before {
		opacity: 0.3;
	}

	@media (max-width: 768px) {
		.section-indicator {
			display: none;
		}
	}
</style>

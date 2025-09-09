import { fly, fade, scale } from 'svelte/transition';

export function getSectionTransitions(scrollDirection, elementType = 'default') {
	const isDownward = scrollDirection === 'down';

	const transitions = {
		default: {
			in: fly,
			inProps: {
				y: isDownward ? 50 : -50,
				duration: 600,
				delay: 100
			},
			out: fly,
			outProps: {
				y: isDownward ? -30 : 30,
				duration: 400
			}
		},

		stagger: {
			in: fly,
			inProps: (index = 0) => ({
				y: isDownward ? 40 : -40,
				duration: 500,
				delay: 200 + index * 100
			}),
			out: fly,
			outProps: {
				y: isDownward ? -20 : 20,
				duration: 300
			}
		},

		scale: {
			in: scale,
			inProps: {
				start: 0.8,
				duration: 600,
				delay: 300
			},
			out: scale,
			outProps: {
				start: 1.1,
				duration: 400
			}
		},

		fade: {
			in: fade,
			inProps: {
				duration: 600,
				delay: 200
			},
			out: fade,
			outProps: {
				duration: 400
			}
		}
	};

	return transitions[elementType] || transitions.default;
}

export function createSectionAnimation(scrollDirection, elementType = 'default', index = 0) {
	const transition = getSectionTransitions(scrollDirection, elementType);

	return {
		in: transition.in,
		inProps:
			typeof transition.inProps === 'function' ? transition.inProps(index) : transition.inProps,
		out: transition.out,
		outProps: transition.outProps
	};
}

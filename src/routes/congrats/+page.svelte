<script lang="ts">
  import { onMount } from 'svelte';
  import confetti from 'canvas-confetti';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';

  let canvas: HTMLCanvasElement;

  onMount(() => {
    // Redirect after 5 seconds
    setTimeout(() => {
      goto('/');
    }, 3500);

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });

    // Fire confetti continuously for a short time
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      myConfetti({
        particleCount: 5,
        angle: 90,
        spread: 360,
        origin: { y: 0 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  });
</script>

<canvas bind:this={canvas} class="fixed inset-0 pointer-events-none z-10"></canvas>

<div in:fade={{ duration: 500 }} class="min-h-screen flex flex-col items-center justify-center bg-green-100 text-center px-6">
  <h1 class="text-4xl font-bold text-green-800 mb-4">🎉 Congratulations!</h1>
  <p class="text-lg text-green-700">Your message has been sent successfully.</p>
</div>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    pointer-events: none;
  }
</style>

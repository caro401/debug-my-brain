<script>
	const steps = [
		{
			summary: 'Debug my brain',
			why: "I feel crap, let's work out why",
			buttons: {
				nextStepButton: "Let's go!"
			}
		},
		{
			summary: 'Do you have some noise to listen to?',
			why: 'You need something in your ears to distract your brain.',
			how: 'Go find some headphones and put on a podcast or some focus music.'
		},
		{
			summary: 'Have you had enough coffee today?',
			why: 'No, that nearly full mug you forgot about does not count.',
			how: 'Go find a cup of coffee, and drink at least half of it.'
		},
		{
			summary: 'Have you had enough food today?',
			how: "Go grab a snack or have some cereal. Eat it, even if you don't really feel like it."
		},
		{
			summary: 'Is your hair or clothing annoying you?',
			why: 'Sometimes hair gets in your face, or your shirt is too tight',
			how: 'Tie your hair up, or put a hat on. Change into comfy clothes.'
		},
		{
			summary: 'Have you showered or cleaned your teeth today?',
			how: 'Go do that! Or at least find some dry shampoo and some gum.'
		},
		{
			summary: 'Is it too bright? Too dark?',
			how: 'Close the curtain, or turn the light on.'
		},
		{
			summary: 'Have you hugged a pet or a human recently?',
			how: 'Go find a pet or a human and hug them. Hugs are good'
		},
		{
			summary: 'Out of ideas...',
			why: "That's all the common things that you don't notice are wrong.",
			how: 'Go find a human and ask them for help',
			buttons: { resetButton: 'I feel ok now' }
		}
	];

	import { localStorageStore, LightSwitch } from '@skeletonlabs/skeleton';
	import confetti from 'canvas-confetti';
	const progress = localStorageStore('stepId', 0);

	$: step = steps[$progress];

	function makeSparkles() {
		// https://github.com/catdad/canvas-confetti
		const defaults = {
			spread: 360,
			shapes: ['star'],
			colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
		};
		confetti({
			...defaults,
			particleCount: 70
		});
		confetti({
			...defaults,
			particleCount: 20,
			shapes: ['circle']
		});
	}
	function reset() {
		progress.set(0);
	}
	function celebrate() {
		makeSparkles();
		reset();
	}

	function nextStep() {
		if ($progress < steps.length) {
			progress.update((p) => p + 1);
		} else console.error('Oh noes no more steps.');
	}
</script>

<header class="flex w-full justify-between items-center">
	<button class="btn variant-soft-primary text-sm" on:click={reset}>Start again</button>
	<LightSwitch />
</header>
<h1 class="mt-12 leading-tight">{step.summary}</h1>
{#if step.why}<p class="prose-lg md:prose-xl lg:prose-2xl">{step.why}</p>{/if}
{#if step.how}<p class="prose-lg md:prose-xl lg:prose-2xl">{step.how}</p>{/if}

<div class="my-12 flex flex-col md:flex-row-reverse gap-x-12 gap-y-6 items-center justify-between">
	{#if step.buttons?.nextStepButton}
		<button class="btn variant-filled-primary flex-grow w-full" on:click={nextStep}
			>{step.buttons.nextStepButton}
		</button>
	{:else if step.buttons?.resetButton}
		<button class="btn variant-ghost-primary flex-grow w-full" on:click={reset}
			>{step.buttons.resetButton}</button
		>
	{:else}
		<button class="btn variant-filled-primary flex-grow w-full" on:click={nextStep}
			>I fixed that, still feel bad
		</button>
		<button class="btn variant-ghost-primary flex-grow w-full" on:click={celebrate}
			>I feel fine now</button
		>
	{/if}
</div>

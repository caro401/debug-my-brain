<script>
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import '@fontsource/recursive/variable.css';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<main>
	<slot />
</main>

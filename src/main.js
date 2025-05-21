import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
  props: {
    // We can remove the 'name' prop or change it, as App.svelte's old prop is no longer used.
    // For now, let's remove it as App.svelte doesn't expect it.
  }
});

export default app;

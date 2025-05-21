<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let lang1 = '';
  let lang2 = '';

  const languages = [
    { code: '', name: 'Select Language' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' }
  ];

  function handleChange() {
    // Always dispatch the event on any change.
    // App.svelte will handle the logic of what to do with the selections.
    dispatch('languageChange', { lang1, lang2 });
  }
</script>

<div>
  <select bind:value={lang1} on:change={handleChange}>
    {#each languages as lang}
      <option value={lang.code}>{lang.name}</option>
    {/each}
  </select>

  <select bind:value={lang2} on:change={handleChange}>
    {#each languages as lang}
      <option value={lang.code}>{lang.name}</option>
    {/each}
  </select>
</div>

<style>
  div {
    margin-bottom: 1em;
  }
  select {
    margin-right: 0.5em;
    padding: 0.5em;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
</style>

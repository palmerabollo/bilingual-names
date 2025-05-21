<script>
  export let namesList = null; // Default to null
  export let message = null;   // Default to null

  function formatNameForLink(name) {
    if (!name || name.length === 0) return '';
    return name.toLowerCase(); // Original used full name, lowercase
  }

  function getFirstLetter(name) {
    if (!name || name.length === 0) return '';
    return name.charAt(0).toLowerCase(); // Original used first letter, lowercase
  }
</script>

<div>
  {#if message}
    <p>{message}</p>
  {:else if namesList && namesList.length > 0}
    <ul>
      {#each namesList as name, i}
        <li>
          <span>
            <a href="http://www.bounty.com/pregnancy-and-birth/baby-names/baby-name-search/{getFirstLetter(name)}/{formatNameForLink(name)}" target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          </span>
          {#if i < namesList.length - 1}
            <span> · </span>
          {/if}
        </li>
      {/each}
    </ul>
  {:else if namesList && namesList.length === 0}
    <p>No results found :(</p> <!-- Fallback if message not set by App.svelte -->
  {:else}
    <p>Select languages to see results</p> <!-- Fallback for initial state if message not set -->
  {/if}
</div>

<style>
  div {
    margin-top: 1em;
    min-height: 50px; /* Ensure space for messages */
  }
  ul {
    list-style-type: none;
    padding: 0;
    display: flex; /* Arrange names in a row */
    flex-wrap: wrap; /* Allow wrapping */
    justify-content: center; /* Center the names block */
  }
  li {
    padding: 0.2em 0.1em; /* Reduced padding for inline display */
    /* border-bottom: 1px solid #eee; - Removed for horizontal display */
  }
  /* li:last-child {
    border-bottom: none; - Removed for horizontal display
  } */
  p {
    font-style: italic;
    color: #555;
  }
  a {
    text-decoration: none;
    color: #1abc9c; /* Flat UI primary color for links */
  }
  a:hover {
    text-decoration: underline;
  }
  span {
    white-space: nowrap; /* Prevent names or dots from breaking mid-element */
  }
</style>

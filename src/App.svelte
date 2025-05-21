<script>
  import { onMount } from 'svelte';
  import LanguageSelector from './LanguageSelector.svelte';
  import Results from './Results.svelte';

  let commonNames = null; // Will hold the array of common name strings, or null
  let resultsMessage = null; // Will hold messages like "Select languages..." or "Select different languages..."
  let geopatternDiv;

  // This will hold the processed names data, e.g., { en: ['SOFIA', 'CHLOE'], fr: ['CHLOE', 'JADE'] }
  let processedNamesByLang = {};

  function processGlobalNames() {
    if (window.names && Array.isArray(window.names)) {
      const data = {};
      window.names.forEach(item => {
        if (!data[item.lang]) {
          data[item.lang] = [];
        }
        // Ensure names are stored as uppercase to match original behavior for comparisons
        data[item.lang].push(item.name.toUpperCase());
      });
      // Sort names within each language list
      for (const lang in data) {
        data[lang].sort();
      }
      processedNamesByLang = data;
    } else {
      console.warn("names.js data not found or not in expected format.");
      processedNamesByLang = {};
    }
    // Set initial message
    resultsMessage = "Select languages to see results";
  }

  function handleLanguageChange(event) {
    const { lang1, lang2 } = event.detail;

    if (!lang1 || !lang2) {
      commonNames = null;
      resultsMessage = "Select languages to see results";
      return;
    }

    if (lang1 === lang2) {
      commonNames = null;
      resultsMessage = "No results found. Please, select two different languages.";
      return;
    }

    if (processedNamesByLang[lang1] && processedNamesByLang[lang2]) {
      const names1 = processedNamesByLang[lang1];
      const names2 = processedNamesByLang[lang2];
      
      // Manual intersection:
      const intersection = names1.filter(name => names2.includes(name));
      
      // Sort results (already sorted within each lang, but intersection might change order)
      intersection.sort(); 
      
      commonNames = intersection;
      if (intersection.length === 0) {
        resultsMessage = "No results found :(";
      } else {
        resultsMessage = null; // Clear message if results are found
      }
    } else {
      // This case should ideally not happen if languages are selected from the list
      // and processedNamesByLang is correctly populated.
      commonNames = null;
      resultsMessage = "Error: Name data not found for one or both selected languages.";
      console.error("Data missing for:", lang1, lang2, processedNamesByLang);
    }
  }

  onMount(() => {
    processGlobalNames(); // Process names and set initial message

    if (geopatternDiv && window.GeoPattern) {
      try {
        const pattern = window.GeoPattern.generate(new Date().toString(), { color: "#48c9b0" });
        geopatternDiv.style.backgroundImage = pattern.toDataURL();
      } catch (e) {
        console.error("Error generating geopattern", e);
      }
    }

    // Initialize Flat UI selects if needed (though Svelte might handle this)
    // Check if jQuery and Flat UI's select plugin are available
    if (window.$ && window.$.fn.select2) {
        // This was the original selector for Flat UI selects.
        // However, LanguageSelector.svelte uses native select elements.
        // If FlatUI styling/JS is desired for them, LanguageSelector.svelte would need adjustment
        // or a different approach to integrate FlatUI's JS.
        // For now, this is commented out as LanguageSelector uses native selects.
        // $('select[data-toggle="select"]').select2();
    }
  });

</script>

<div class="demo-headline geopattern" bind:this={geopatternDiv}>
  <h1 class="demo-logo">
    <div class="logo"></div>
    Bilingual Names
    <small>find names that are spelled the same in several languages</small>
  </h1>
</div>

<main class="demo-container container">
  <!-- The original h1 "Bilingual Names" is now part of the demo-headline -->
  <!-- The descriptive text "Please, find names..." is implicitly handled by LanguageSelector's purpose -->
  
  <LanguageSelector on:languageChange={handleLanguageChange} />
  
  <Results namesList={commonNames} message={resultsMessage} />
</main>

<footer>
  <div class="container">
    <div class="row">
      <div class="col-7">
        <h3 class="footer-title">About</h3>
        <p>Do you like this site? Let me know <a href="https://twitter.com/palmerabollo" target="_blank">on Twitter</a>.</p>
      </div>

      <div class="col-5">
        <div class="footer-banner">
          <h3 class="footer-title"></h3>
          <ul>
            <li><a href="https://github.com/palmerabollo/bilingual-names" target="_blank">Github code</a></li>
            <li><a href="https://twitter.com/palmerabollo" target="_blank">@palmerabollo</a></li>
            <li><a href="https://guidogarcia.net" target="_blank">guidogarcia.net</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Main styles from original App.svelte, slightly adjusted */
  main.demo-container { /* Applied demo-container and container classes directly */
    text-align: center;
    padding: 1em; /* Keep padding for content within main */
    /* max-width is handled by .container from bootstrap/flat-ui */
    margin: 0 auto; /* Keep auto margin for centering */
  }

  /* Styles for Header (geopattern) and Footer are in existing CSS files (demo.css, etc.) */
  /* H1 inside geopattern is styled by demo.css */

  /* Global styles from original App.svelte */
  :global(body) {
    font-family: Arial, sans-serif; /* This might conflict with FlatUI, check appearance */
    background-color: #f4f4f4; /* This will be overridden by demo.css's body style */
    color: #333;
    line-height: 1.6;
  }

  /* Ensure Svelte-specific styles don't break existing layout too much */
  /* Add any additional component-specific styles if needed */
</style>

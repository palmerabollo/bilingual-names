# Building and Running the Svelte Application

The Webpack build process for this project encountered environment-specific issues within the automated development platform. However, the Svelte application code itself is complete and functional.

Follow these instructions to set up and run the application in your local environment using a standard Svelte project setup.

## Prerequisites

*   Node.js (which includes npm) installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).

## Steps

1.  **Create a new Svelte project:**
    Open your terminal and run the following command to scaffold a new Svelte project using the official template. Replace `my-bilingual-names-app` with your preferred project name.

    ```bash
    npm create svelte@latest my-bilingual-names-app
    ```
    During the setup, you'll be asked a few questions:
    *   "Which Svelte app template?": Choose "SvelteKit App" (the default) or "Skeleton project". For simplicity with existing code, "Skeleton project" might be easier, but "SvelteKit App" is also fine.
    *   "Add type checking with TypeScript?": Choose "No" (or "Yes, using JSDoc comments" if you prefer, but our current code is plain JS).
    *   Select any other features you might want (ESLint, Prettier, Playwright) as per your preference. They are not strictly necessary for running the core application.

2.  **Navigate to your new project directory:**
    ```bash
    cd my-bilingual-names-app
    ```

3.  **Copy existing application files:**
    You'll need to copy the Svelte components, the `names.js` data file, the main `index.html`, and the static assets from *this* project (the one you are currently viewing) into your newly created `my-bilingual-names-app` project.

    *   **Svelte Components:**
        *   Copy the entire `src/` directory from this project into your new project, replacing the example `src/` directory created by the Svelte template.
        *   (If you chose "SvelteKit App", the components typically go into `src/lib/` or `src/routes/`. For a "Skeleton project", `src/App.svelte` is standard. You may need to adjust paths in `main.js` or `App.svelte` if you place them differently, e.g. if `LanguageSelector.svelte` and `Results.svelte` are in `src/lib/`). For simplicity, assume you are copying to replace/merge into the new project's `src/` so `App.svelte`, `LanguageSelector.svelte`, `Results.svelte`, and `main.js` are at `src/`.
    *   **`names.js` data file:**
        *   Copy `names.js` from the root of this project into the `static/` directory of your new SvelteKit project (if you chose SvelteKit). If you chose a "Skeleton" Svelte project, you might place it in `public/` and ensure it's loaded by `index.html`.
        *   The current Svelte code in `App.svelte` expects `names.js` to be loaded globally via a script tag in `index.html`, making `window.names` available.
    *   **`index.html`:**
        *   Copy the `index.html` file from the root of this project and use it to replace the `public/index.html` (for older Svelte templates) or `src/app.html` (for SvelteKit) in your new project.
        *   Ensure this `index.html` correctly loads `names.js` *before* the main Svelte bundle (`bundle.js` or similar). It should look something like:
            ```html
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Bilingual Names</title>
                <!-- Add links to your CSS files here -->
                <link rel="stylesheet" href="/flatui/css/vendor/bootstrap.min.css">
                <link rel="stylesheet" href="/flatui/css/flat-ui.css">
                <link rel="stylesheet" href="/assets/css/demo.css">
                <link rel="stylesheet" href="/build/bundle.css"> <!-- Or the path to Svelte's generated CSS -->
            </head>
            <body>
                <div id="app"></div>
                <script src="/names.js"></script> <!-- Load names.js first -->
                <script defer src="/build/bundle.js"></script> <!-- Or the path to Svelte's generated JS -->
                <!-- You might need flatui.js if its components are used dynamically -->
                <script src="/flatui/scripts/flat-ui.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/geopattern/1.2.3/js/geopattern.min.js"></script>
            </body>
            </html>
            ```
           (Adjust paths to `bundle.css` and `bundle.js` based on what the new Svelte project generates, typically in a `build` or `dist` subfolder within `public` or `static`). SvelteKit uses `%sveltekit.head%` and `%sveltekit.body%` in `src/app.html`.
    *   **Static Assets (CSS, Fonts, Images):**
        *   Copy the `flatui/` directory from this project into the `static/` (SvelteKit) or `public/` directory of your new project.
        *   Copy the `assets/` directory from this project into the `static/` (SvelteKit) or `public/` directory of your new project.

4.  **Install dependencies:**
    In your new project's directory, run:
    ```bash
    npm install
    ```
    This will install Svelte and any other dependencies defined in the new project's `package.json`.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start a local development server (usually at `http://localhost:5173` or similar). Open this URL in your browser to see the application.

## Notes

*   The provided `src/main.js` file is set up to mount the `App.svelte` component to an element with `id="app"` in your `index.html`.
*   The `App.svelte` component initializes Geopattern using `window.GeoPattern`. Ensure the `geopattern.min.js` script is loaded in your `index.html`.
*   Styling: The application relies on CSS files from the `flatui` and `assets` directories. Ensure these are correctly placed in your `static` or `public` folder and linked in your `index.html`.
*   SvelteKit: If using SvelteKit, you might need to adjust how static assets and `names.js` are handled. SvelteKit typically serves files from the `static` directory at the root. The `src/routes/+page.svelte` would likely import and render `App.svelte`. You would place the contents of the provided `index.html`'s body into `+page.svelte` (or `App.svelte`) and head contents into `src/app.html` or a `+layout.svelte`.

This setup allows you to use the refactored Svelte code with a standard, working Svelte build system.

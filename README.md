# Netflix Clone

## Run locally

1. Install Node.js 22.12 or newer.
2. Open this folder in your editor and run `npm install`.
3. In the working project folder, `.env.local` contains your existing TMDB key. The downloadable ZIP excludes that file: copy `.env.example` to `.env.local` and enter your key after extracting the ZIP.
4. Run `npm run dev`, then open the address printed in the terminal.
5. Restart the development server after changing the environment file.

## Trailers and details

- Hover over a movie for 800 milliseconds to start a muted trailer preview. Leaving the card stops it.
- Click a poster or its Play button to open the larger trailer player with sound enabled and playback controls.
- Click the down-arrow details button or the banner's More Info button to view the synopsis, rating, year, and genres without autoplay.
- Close the popup using the close button, the background, or Escape. Closing removes the player and stops playback.
- On touch devices, tap a poster to open the player.
- Trailers and genres come from the same TMDB API used by the existing rows. Both movies and TV series are supported. Official YouTube trailers are preferred, followed by other trailers and teasers.
- A title without a trailer keeps its image and shows an availability message. Some YouTube videos may block embedding or be unavailable in your region. Browsers may require pressing Play before sound can start.

## Code changes

The project still uses the existing Axios instance, ordinary React state/effects, props, and CSS modules. No extra packages or backend were added.

- `MovieCard`: hover timer, muted iframe preview, and Play/details buttons.
- `MovieModal`: shared trailer player and movie details popup.
- `movieDetails`: TMDB details request and trailer selection.
- `App`, `DisplayRow`, and `SlideShow`: pass the selected title to the shared popup.
- `Banner`: connects Play and More Info to the same popup.

## API key

The Axios instance reads `VITE_TMDB_API_KEY` from `.env.local`. Environment files are ignored by Git; `.env.example` is safe to commit. Do not upload `.env.local` or share a project archive containing it.

A frontend environment variable is still visible in built browser code and network requests. It prevents accidental commits, not discovery by visitors. To keep the key secret, use a server or serverless proxy. Replace your key if it was already published in a repository.

## Checks

- `npm run build`
- `npm run lint`

## Netlify deployment

The public demo is called Trailer Showcase, uses its own text branding, and displays a portfolio disclaimer. No accounts, passwords, payments, or full-movie streaming are provided. These changes do not guarantee Netlify approval or grant permission to third-party content.

### Import from a repository

1. Push the project folder to your repository, excluding `.env.local`, `node_modules`, and `dist`.
2. In Netlify, import that repository. If this folder is inside a larger repository, select it as the base directory.
3. The included `netlify.toml` sets the build command to `npm run build`, publish directory to `dist`, and Node version to 22.
4. Add `VITE_TMDB_API_KEY` in Netlify's environment variables for builds, then deploy.
5. Environment values embedded in this frontend are public in the generated JavaScript. A serverless proxy is required for secrecy.

### Manual upload

Run `npm run build` with your local `.env.local` present, then upload only the generated `dist` folder to Netlify. The built browser JavaScript contains the key; do not upload your source folder or `.env.local`.

Use your own site name/domain. Keep the educational disclaimer visible. Use content you have permission to display. If Netlify flags the project, contact their support and explain it; do not try to bypass the warning.

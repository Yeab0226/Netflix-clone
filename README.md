# Trailer Showcase 🎬

A Netflix-inspired movie trailer website built with React and Vite. Browse movies and TV series, watch muted trailer previews on hover, and open a larger player to explore trailers and title details.

> Educational portfolio project. Not affiliated with, endorsed by, or operated by Netflix. This website provides trailers only—not full movies, subscriptions, or Netflix account access.

## Features

- **Hover previews:** Muted trailers start after an 800 ms delay and stop when the pointer leaves.
- **Trailer player:** Click a poster or Play button to open a larger player with sound and playback controls.
- **Movie details:** View the synopsis, rating, release year, and genres.
- **Movie and TV rows:** Browse trending titles, featured series, action movies, and top-rated movies.
- **Banner actions:** Play the featured trailer or open its details.
- **Touch support:** Tap a poster to open the player.
- **Unavailable trailers:** Display a helpful message when no trailer is available.

## Built With

- React
- Vite
- Axios
- CSS Modules
- Swiper
- React Icons and Lucide React
- TMDB API
- YouTube embeds

## Getting Started

### Requirements

- Node.js 22.12 or newer
- npm
- A TMDB API key

### Installation

Clone this repository, open the project folder, and install the dependencies:

```bash
npm install
```

Copy `.env.example` to `.env.local`, then add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open the local address shown in your terminal. Restart the server after changing the environment file.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build in `dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run code checks |

## Project Structure

```text
src/
├── components/
│   ├── Banner/
│   ├── DisplayRow/
│   ├── Footer/
│   ├── Header/
│   ├── MovieCard/
│   ├── MovieModal/
│   └── SlideShow/
├── Utility/
│   ├── MovieInstance.js
│   ├── movieDetails.js
│   └── requestUrls.js
├── App.jsx
└── main.jsx
```

## How Trailers Work

The website uses the existing Axios instance to request title details and video information from TMDB. Both movies and TV series are supported.

Official YouTube trailers are preferred. If an official trailer is unavailable, another trailer or teaser may be selected.

Hovering over a card starts a short timer before loading a muted preview. Leaving the card removes the preview player. Clicking Play opens the shared trailer popup, while the details button opens it without autoplay.

## API Key Handling

`.env.local` is ignored by Git. Commit `.env.example` with a placeholder value, and keep your actual key out of the repository.

**Frontend environment variables are not secret.** Vite includes values used by the application in its browser build, so visitors can discover the API key. A backend or serverless proxy is required to keep it private.

Replace your key if it has already been published.

## Deployment

The project includes `netlify.toml` with:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js version: `22`
- A fallback to `index.html` for client-side navigation

For a repository-based deployment, configure `VITE_TMDB_API_KEY` in the hosting provider’s build environment.

For manual deployment, build the project locally and upload the generated `dist` folder.

## Limitations

- Some titles do not have trailers.
- Videos may be unavailable in certain regions or block embedding.
- Browser settings may require pressing Play before audio starts.
- Navigation categories, search, My List, notifications, and profile controls are interface placeholders.

## Credits

Movie information and images are provided by [TMDB](https://www.themoviedb.org/). Trailers play through [YouTube](https://www.youtube.com/).

This product uses the TMDB API but is not endorsed or certified by TMDB.

Third-party names, images, and video content belong to their respective owners.
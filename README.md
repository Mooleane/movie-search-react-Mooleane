## Movie Search (React + Vite)

This is a small movie-search React app built with Vite. It uses the OMDb API to search for movies and show details.

This README focuses on first-time setup, how to provide the required API key via a `.env` file, and common troubleshooting steps.

## Quick start — first time setup

## React Compiler

These steps will get the project running locally. They assume you have Node.js and npm (or a compatible package manager) installed.

1. Clone the repository and install dependencies

```bash
git clone <repo-url>
cd movie-search-react-Mooleane
npm install
```

2. Create a .env file

The app needs an OMDb API key. Create a file named `.env` in the project root with this content:

```env
# Replace the example value with your real OMDb API key
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

Notes:

- Vite only exposes environment variables to client code when they are prefixed with `VITE_`.
- The app reads the key from `import.meta.env.VITE_OMDB_API_KEY` (see `src/services/omdbApi.js`).
- `.env` is already included in `.gitignore` to avoid accidentally committing secrets.

3. Run the dev server

```bash
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173) in your browser.

4. Build and preview

```bash
npm run build
npm run preview
```

## How to get an OMDb API key

1. Visit https://www.omdbapi.com/ and sign up for a free API key.
2. Copy the key into your `.env` file as `VITE_OMDB_API_KEY`.

## Project scripts

These scripts are defined in `package.json`:

- `npm run dev` — start the development server with HMR
- `npm run build` — create a production build in `dist/`
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint across the project

## Common issues & troubleshooting

- If the app shows errors when fetching data, check that `VITE_OMDB_API_KEY` is set correctly and that the OMDb key is active.
- If `import.meta.env.VITE_OMDB_API_KEY` is undefined in the browser, restart the Vite dev server after creating or editing `.env`.
- If you get `Invalid API key` or rate-limit errors, confirm your key on the OMDb dashboard and consider an upgraded plan.
- If dependencies fail to install, ensure your Node.js version is supported (Node 18+ recommended) and try removing `node_modules` and reinstalling.

## Recommended environment

- Node.js LTS (18.x or newer recommended)
- npm (or pnpm/yarn) latest stable

## Security

Never commit your `.env` file or API keys to version control. Use environment-specific secret management for production.

## Where to look in the code

- API calls: `src/services/omdbApi.js`
- Main app entry: `src/main.jsx` and `src/App.jsx`
- Components: `src/components/`

If you'd like, I can also add a small `.env.example` file with a placeholder key and a short contributing or developer setup guide — tell me which you'd prefer.

## Component API

This section documents the main UI components in `src/components/` and the props they accept. Use these notes when building or reusing components in the app.

### SearchBar

File: `src/components/SearchBar.jsx`

Props:
- `value` (string) — current search value. The component keeps a local copy and syncs when this prop changes.
- `onChange` (function) — called when the user submits the form (enter or search). Signature: `(newValue: string) => void`.
- `onClear` (function) — called when the clear button is pressed. Signature: `() => void`.
- `placeholder` (string, default: "Search for movies...") — input placeholder text.
- `disabled` (boolean, default: false) — disables the input and clear button.

Behavior: controlled-ish input with local editing. Submitting the form calls `onChange(localValue)`. Pressing clear resets local state and calls `onClear()`.

Example:

```jsx
<SearchBar
	value={query}
	onChange={(q) => setQuery(q)}
	onClear={() => setQuery('')}
/>
```

### MovieCard

File: `src/components/MovieCard.jsx`

Props:
- `movie` (object) — movie item returned by OMDb API. Expected fields used: `imdbID`, `Title`, `Year`, `Type`, `Poster`.

Behavior: renders a link to `/movie/{imdbID}` and shows the poster (or a placeholder if `Poster === 'N/A'`), title, year and type.

Example:

```jsx
<MovieCard movie={movie} />
```

### FavoriteButton

File: `src/components/FavoriteButton.jsx`

Props:
- `isFavorite` (boolean) — whether the item is currently favorited.
- `onToggle` (function) — called when the button is clicked. Signature: `() => void`.
- `disabled` (boolean) — disables the button.

Behavior: toggles visual state and calls `onToggle`. Accessible label updates depending on `isFavorite`.

Example:

```jsx
<FavoriteButton isFavorite={true} onToggle={() => toggleFavorite(id)} />
```

### LazyImage

File: `src/components/LazyImage.jsx`

Props:
- `src` (string) — image URL.
- `alt` (string) — alt text for the image.
- `className` (string) — optional classes applied to the wrapper and image.
- `fallback` (ReactNode) — optional fallback UI to render if the image fails to load.

Behavior: shows a simple loading skeleton until the image fires `onLoad`. On `onError` it renders the `fallback` if provided.

Example:

```jsx
<LazyImage src={movie.Poster} alt={`${movie.Title} poster`} className="w-48 h-72" />
```

### LoadingSpinner

File: `src/components/LoadingSpinner.jsx`

Props: none.

Behavior: simple presentational component showing a spinner and the text "Loading...". Use it for loading states where network latency is expected.

Example:

```jsx
<LoadingSpinner />
```

### ErrorBoundary

File: `src/components/ErrorBoundary.jsx`

Props:
- `children` — component children to wrap.

Behavior: class-based React error boundary that catches render errors and displays a friendly error UI with a reload button. Logs error details to the console.

Usage:

```jsx
<ErrorBoundary>
	<App />
</ErrorBoundary>
```

### AppShell

File: `src/components/AppShell.jsx`

Props:
- `children` — main content to render inside the app layout.

Behavior: top-level layout containing the header, navigation links (Search, Favorites) and a `main` area for children. Uses `react-router`'s `useLocation` to mark active links.

Example:

```jsx
<AppShell>
	<Routes>...</Routes>
</AppShell>
```
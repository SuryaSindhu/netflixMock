# Netflix Clone

A responsive Netflix-inspired web app built with React. Browse movies and TV shows, watch trailers, search by text or genre, and explore show details — all powered by the TMDB API.

**[Live Demo →](https://your-firebase-url.web.app)**

## Features

### Login Page

- Sign In / Sign Up toggle with form validation
- Firebase Authentication (email + password)
- Guest login option (bypasses auth)
- Friendly error messages for 13+ Firebase error codes (invalid email, wrong password, too many attempts, etc.)
- Full-screen Netflix background with dark overlay form

### Browse Page

- **Header:** Netflix logo, Movies / TV Shows / Explore navigation, hamburger menu on mobile, user greeting + Sign Out
- **Desktop Hero:** Auto-playing YouTube trailer background for the first movie/show, with title, truncated overview, Play and More Info buttons
- **Mobile Hero:** Gradient poster layout with genre pills, Play and Info buttons
- **Category Lists:** Horizontally scrollable rows — Now Playing, Trending, Popular, Top Rated, Upcoming (labels adapt for Movies vs TV Shows)
- **Scroll Arrows:** Appear on hover, smooth scroll ±400px, auto-hidden on mobile
- **Content Toggle:** Switch between Movies and TV Shows from the header — all lists update accordingly

### Movie Detail Page (`/movies/:id`)

- Embedded YouTube trailer with custom mute/unmute and fullscreen controls (falls back to backdrop or poster)
- Movie info: title, tagline, color-coded rating (green/yellow/red), year, runtime, certification
- Genre pills, overview, quick facts (studio, language, budget, revenue, status)
- Watch provider logos (streaming, rent, buy)
- Scrollable cast row (20 actors) — click to visit actor's page
- Related movie lists: Similar, Recommendations, More in same genres

### Show Detail Page (`/shows/:id`)

- Same layout as Movie Detail Page, adapted for TV shows (seasons, episodes, content rating)
- **Episode Browser:** Custom season dropdown, episode cards with thumbnails, runtime, air date, expandable overview
- "Load More" pagination for long episode lists (15 at a time)
- Tries season-level trailer first, falls back to show-level

### Person Page (`/person/:id`)

- Profile photo, name, known-for department, birthday (with calculated age), birthplace, deathday
- Expandable biography (collapses after 400 characters)
- Quick stats: number of movies, TV shows, popularity score
- Filmography split into Movies and TV Shows rows

### Search Page (`/search`)

- **Text Search tab:** Debounced search input (500ms), searches movies, TV shows, and people simultaneously via TMDB multi-search
- **Genre Mix tab:** Select up to 3 genres, discover content matching all combinations (all selected, pairs, singles) — results deduplicated and grouped
- Search results cached in context (preserved when switching tabs or navigating back)
- People results shown as circular portraits with name and department

### 404 Page

- "Lost your way?" message with a link back to Browse

### Cross-Cutting

- **Route Protection:** All pages except Login require authentication — redirects to Login if not signed in
- **Responsive Design:** Mobile-first, adapts at the `md` (768px) breakpoint — hamburger nav, stacked layouts, hidden scroll arrows on mobile
- **Hover Popups:** Desktop-only popups on movie cards showing rating, runtime/seasons, genres, and overview (positioned relative to card)
- **Shimmer Loading:** Skeleton loaders for every page (Browse, Movie, Show, Person, Search) matching the final layout
- **Page Transitions:** Framer Motion fade in/out on route changes
- **Error Boundary:** Catches React crashes with a friendly fallback and home button
- **Dark Theme:** Netflix-inspired black/zinc palette with red (#e50914) accents throughout

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Auth | Firebase Authentication |
| Hosting | Firebase Hosting |
| API | TMDB (The Movie Database) |
| Animations | Framer Motion |
| State | Context API + Custom Hooks |

## Project Structure

```
src/
├── App.js                      # Router config + App shell
├── index.js                    # Entry point
├── index.css                   # Global styles (Tailwind)
├── pages/                      # Route-level components (one per URL)
│   ├── Login.jsx
│   ├── Browse.jsx
│   ├── PlayPage.jsx
│   ├── ShowPage.jsx
│   ├── PersonPage.jsx
│   └── SearchPage.jsx
├── features/
│   ├── browse/                 # Browse page specific UI
│   │   ├── Header.jsx
│   │   ├── MainContainer.jsx
│   │   ├── SecondaryContainer.jsx
│   │   ├── MobileHero.jsx
│   │   ├── VideoBG.jsx
│   │   └── VideoInfo.jsx
│   └── search/                 # Search page specific UI
│       ├── TextSearch.jsx
│       └── GenreSearch.jsx
├── components/                 # Generic reusable components
│   ├── MovieCard.jsx
│   ├── MovieList.jsx
│   ├── MoviePopup.jsx
│   ├── Shimmer.jsx
│   ├── TrailerPlayer.jsx
│   ├── EpisodeCard.jsx
│   ├── EpisodeList.jsx
│   └── ProtectedRoute.jsx
├── hooks/                      # Custom hooks
│   ├── useFetch.jsx            # Generic fetch hook
│   └── useCategory.jsx         # TMDB category data hook
├── context/                    # App state (Context API)
│   └── AppContext.jsx          # Auth + UI state
└── utils/                      # Config & helpers
    ├── constants.js
    ├── firebase.js
    └── validations.js
```

## Screenshots

<!-- Add screenshots here -->

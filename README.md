# Netflix Clone

A responsive Netflix-inspired web app built with React. Browse movies and TV shows, watch trailers, search by text or genre, and explore show details — all powered by the TMDB API.

**[Live Demo →](https://your-firebase-url.web.app)**

## Features

- Authentication (sign up, sign in, guest login) via Firebase
- Browse movies and TV shows with category toggle
- Auto-playing trailer backgrounds on desktop
- Mobile-optimized hero with poster layout
- Hover popups with movie details and ratings
- Full movie/show detail pages with trailers and recommendations
- Text search and genre-based discovery
- Episode lists for TV shows
- Person/actor pages with filmography
- Shimmer loading states throughout
- Fully responsive (mobile, tablet, desktop)
- Route protection for authenticated users

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

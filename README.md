# Netflix Clone

A responsive Netflix-inspired web app built with React. Browse movies and TV shows, watch trailers, search by text or genre, and explore show details — all powered by the TMDB API.

**[Live Demo →](https://netflixgpt-214cd.web.app/)**

## Features

🔐 **Authentication**

- Firebase email/password sign-in/sign-up with friendly error messages
- Guest login option, form validation, route protection

🎬 **Browse**

- Auto-playing YouTube trailer hero (desktop) / gradient poster hero (mobile)
- Movies ↔ TV Shows toggle — all category rows update instantly
- Horizontally scrollable lists: Now Playing, Trending, Popular, Top Rated, Upcoming
- Hover popups on cards with rating, runtime, genres, overview (desktop)

🎥 **Movie & Show Detail Pages**

- Embedded trailer with custom controls (mute/fullscreen), backdrop/poster fallback
- Rating (color-coded), genres, overview, quick facts, watch providers, cast row
- Related content: Similar, Recommendations, More in same genres
- Shows add: season/episode browser with pagination, season-level trailer fallback

👤 **Person Page**

- Profile, bio (expandable), birthday/age, filmography split by movies & TV

🔍 **Search**

- Text search: debounced multi-search (movies, TV, people) with cached results
- Search results cached in context — navigate away and come back, your last query and results stay intact (no re-fetch)
- Genre mix: pick up to 3 genres, discover all combo matches (deduplicated)
- AI Search: describe what you're in the mood for (e.g. "dark sci-fi like Blade Runner") — powered by Google Gemini, returns matching movies & TV shows via TMDB
- Active tab remembered across navigation

✨ **UI/UX**

- Mobile-first responsive design (breakpoint at 768px)
- Shimmer skeletons for every page, Framer Motion page transitions
- Global scroll-to-top button, error boundary with fallback
- Dark Netflix palette with red accents

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
| AI | Google Gemini (free tier) |

## Recodings
- Desktop view: https://drive.google.com/file/d/1JIDV2x83mHhGYfPE-5UPf3BzdDuhbNiy/view?usp=drive_link
- Mobile view: https://drive.google.com/file/d/1FrYdRGhnv9bmSIWl3nriylBHIZheQDLc/view?usp=drive_link

## Screenshots

- https://drive.google.com/drive/folders/1074texd5GiPT9hfUDgPYUr3NLT_fMJ66?usp=sharing

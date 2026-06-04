export const TMDB_OPTIONS = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`
    }
};

// Local assets
export { default as NETFLIX_LOGO } from '../assets/netflix-logo.png';
export { default as NETFLIX_BG } from '../assets/netflix-bg.jpg';
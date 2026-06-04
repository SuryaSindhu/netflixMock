export const TMDB_OPTIONS = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`
    }
};

// TMDB image CDN
export const IMG_CDN_W500 = "https://image.tmdb.org/t/p/w500";
export const IMG_CDN_W300 = "https://image.tmdb.org/t/p/w300";

// Local assets
export { default as NETFLIX_LOGO } from '../assets/netflix-logo.png';
export { default as NETFLIX_BG } from '../assets/netflix-bg.jpg';
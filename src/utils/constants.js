export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

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
export const IMG_CDN_W185 = "https://image.tmdb.org/t/p/w185";
export const IMG_CDN_W45 = "https://image.tmdb.org/t/p/w45";

// Pick the best available trailer from TMDB video results
export const pickTrailer = (results) =>
    results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
    || results?.find(v => v.type === 'Teaser' && v.site === 'YouTube')
    || results?.find(v => v.type === 'Clip' && v.site === 'YouTube')
    || results?.find(v => v.site === 'YouTube')
    || null;

// Rating color helper — returns { text, bg } classes based on vote_average
export const getRatingStyle = (rating) => {
    if (rating >= 7) return { text: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' };
    if (rating >= 5) return { text: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' };
    return { text: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' };
};

// Local assets
export { default as NETFLIX_LOGO } from '../assets/netflix-logo.png';
export { default as NETFLIX_BG } from '../assets/netflix-bg.jpg';
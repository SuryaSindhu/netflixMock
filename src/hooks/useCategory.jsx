import { useAppContext } from '../context/AppContext';
import { TMDB_BASE_URL } from '../utils/constants';
import useFetch from './useFetch';

const ENDPOINTS = {
    nowPlaying: { movie: 'movie/now_playing', tv: 'tv/airing_today' },
    popular:    { movie: 'movie/popular',     tv: 'tv/popular' },
    topRated:   { movie: 'movie/top_rated',   tv: 'tv/top_rated' },
    upcoming:   { movie: 'movie/upcoming',    tv: 'tv/on_the_air' },
    trending:   { movie: 'trending/movie/week', tv: 'trending/tv/week' },
};

const useCategory = (category) => {
    const { contentType } = useAppContext();
    const path = ENDPOINTS[category]?.[contentType];
    const url = path ? `${TMDB_BASE_URL}/${path}?language=en-US&page=1` : null;

    const data = useFetch(url);
    return data?.results ?? [];
};

export default useCategory;

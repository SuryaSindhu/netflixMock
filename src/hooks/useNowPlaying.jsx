import { useEffect } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setNowPlaying } from '../utils/movieSlice';

const useNowPlaying = () => {
    const dispatch = useDispatch();
    const nowPlaying = useSelector((state) => state.movies.nowPlaying);
    const contentType = useSelector((state) => state.user.contentType);

    useEffect(() => {
        if (nowPlaying.length > 0) return;

        const endpoint = contentType === 'movie'
            ? 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
            : 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1';

        fetch(endpoint, TMDB_OPTIONS)
            .then(res => res.json())
            .then(res => {
                dispatch(setNowPlaying(res.results));
            })
            .catch(err => console.error(err));
    }, [contentType]);
}

export default useNowPlaying;


import { useEffect } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setNowPlaying } from '../utils/movieSlice';

const useNowPlaying = () => {
    const dispatch = useDispatch();
    const nowPlaying = useSelector((state) => state.movies.nowPlaying);

    useEffect(() => {
        if (nowPlaying.length > 0) return;

        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', TMDB_OPTIONS)
            .then(res => res.json())
            .then(res => {
                dispatch(setNowPlaying(res.results));
            })
            .catch(err => console.error(err));
    }, []);
}

export default useNowPlaying

import { useEffect } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setUpcoming } from '../utils/movieSlice';

const useUpcoming = () => {
    const dispatch = useDispatch();
    const upcoming = useSelector((state) => state.movies.upcoming);
    const contentType = useSelector((state) => state.user.contentType);

    useEffect(() => {
        if (upcoming.length > 0) return;

        const endpoint = contentType === 'movie'
            ? 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'
            : 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1';

        fetch(endpoint, TMDB_OPTIONS)
            .then(res => res.json())
            .then(res => {
                dispatch(setUpcoming(res.results));
            })
            .catch(err => console.error(err));
    }, [contentType]);
}

export default useUpcoming;

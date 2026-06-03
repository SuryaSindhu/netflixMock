import { useEffect } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setTopRated } from '../utils/movieSlice';

const useTopRated = () => {
    const dispatch = useDispatch();
    const topRated = useSelector((state) => state.movies.topRated);
    const contentType = useSelector((state) => state.user.contentType);

    useEffect(() => {
        if (topRated.length > 0) return;

        const endpoint = contentType === 'movie'
            ? 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
            : 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';

        fetch(endpoint, TMDB_OPTIONS)
            .then(res => res.json())
            .then(res => {
                dispatch(setTopRated(res.results));
            })
            .catch(err => console.error(err));
    }, [contentType]);
}

export default useTopRated;

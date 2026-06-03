import { useEffect } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setTopRated } from '../utils/movieSlice';

const useTopRated = () => {
    const dispatch = useDispatch();
    const topRated = useSelector((state) => state.movies.topRated);

    useEffect(() => {
        if (topRated.length > 0) return;

        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', TMDB_OPTIONS)
            .then(res => res.json())
            .then(res => {
                dispatch(setTopRated(res.results));
            })
            .catch(err => console.error(err));
    }, []);
}

export default useTopRated;

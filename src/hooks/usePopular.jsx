import { useEffect } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setPopular } from '../utils/movieSlice';

const usePopular = () => {
    const dispatch = useDispatch();
    const popular = useSelector((state) => state.movies.popular);

    useEffect(() => {
        if (popular.length > 0) return;

        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', TMDB_OPTIONS)
            .then(res => res.json())
            .then(res => {
                dispatch(setPopular(res.results));
            })
            .catch(err => console.error(err));
    }, []);
}

export default usePopular;

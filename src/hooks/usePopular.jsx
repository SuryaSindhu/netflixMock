import { useEffect } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setPopular } from '../utils/movieSlice';

const usePopular = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', TMDB_OPTIONS)
            .then(res => res.json())
            .then(res => {
                dispatch(setPopular(res.results));
            })
            .catch(err => console.error(err));
    }, []);
}

export default usePopular;

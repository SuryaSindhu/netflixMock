import { useEffect } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setUpcoming } from '../utils/movieSlice';

const useUpcoming = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', TMDB_OPTIONS)
            .then(res => res.json())
            .then(res => {
                dispatch(setUpcoming(res.results));
            })
            .catch(err => console.error(err));
    }, []);
}

export default useUpcoming;

import { useEffect } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setPopular } from '../utils/movieSlice';

const usePopular = () => {
    const dispatch = useDispatch();
    const popular = useSelector((state) => state.movies.popular);
    const contentType = useSelector((state) => state.user.contentType);

    useEffect(() => {
        if (popular.length > 0) return;

        const endpoint = contentType === 'movie'
            ? 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
            : 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';

        fetch(endpoint, TMDB_OPTIONS)
            .then(res => res.json())
            .then(res => {
                dispatch(setPopular(res.results));
            })
            .catch(err => console.error(err));
    }, [contentType]);
}

export default usePopular;

import { useEffect } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setTrending } from '../utils/movieSlice';

const useTrending = () => {
    const dispatch = useDispatch();
    const trending = useSelector((state) => state.movies.trending);
    const contentType = useSelector((state) => state.user.contentType);

    useEffect(() => {
        if (trending.length > 0) return;

        const type = contentType === 'movie' ? 'movie' : 'tv';

        fetch(`https://api.themoviedb.org/3/trending/${type}/week?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(res => {
                dispatch(setTrending(res.results));
            })
            .catch(err => console.error(err));
    }, [contentType]);
}

export default useTrending;

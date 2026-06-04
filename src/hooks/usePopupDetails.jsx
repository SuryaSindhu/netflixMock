import { useEffect, useState } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';

const usePopupDetails = (movieId, isTV) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const endpoint = isTV
            ? `https://api.themoviedb.org/3/tv/${movieId}?language=en-US`
            : `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

        fetch(endpoint, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setDetails(data))
            .catch(err => console.error(err));
    }, [movieId, isTV]);

    return details;
};

export default usePopupDetails;

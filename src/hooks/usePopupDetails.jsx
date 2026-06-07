import { useEffect, useState } from 'react';
import { TMDB_OPTIONS, TMDB_BASE_URL } from '../utils/constants';

const usePopupDetails = (movieId, isTV) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const endpoint = isTV
            ? `${TMDB_BASE_URL}/tv/${movieId}?language=en-US`
            : `${TMDB_BASE_URL}/movie/${movieId}?language=en-US`;

        fetch(endpoint, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setDetails(data))
            .catch(err => console.error(err));
    }, [movieId, isTV]);

    return details;
};

export default usePopupDetails;

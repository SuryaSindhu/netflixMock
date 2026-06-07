import { useEffect, useState } from 'react';
import { TMDB_OPTIONS, TMDB_BASE_URL } from '../utils/constants';

const usePersonDetails = (personId) => {
    const [person, setPerson] = useState(null);
    const [movieCredits, setMovieCredits] = useState([]);
    const [tvCredits, setTvCredits] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        const options = { ...TMDB_OPTIONS, signal };

        setPerson(null);
        setMovieCredits([]);
        setTvCredits([]);

        fetch(`${TMDB_BASE_URL}/person/${personId}?language=en-US`, options)
            .then(res => res.json())
            .then(data => setPerson(data))
            .catch(err => { if (err.name !== 'AbortError') console.error(err); });

        fetch(`${TMDB_BASE_URL}/person/${personId}/combined_credits?language=en-US`, options)
            .then(res => res.json())
            .then(data => {
                const movies = (data.cast || [])
                    .filter(c => c.media_type === 'movie' && c.poster_path)
                    .sort((a, b) => b.popularity - a.popularity);
                const tv = (data.cast || [])
                    .filter(c => c.media_type === 'tv' && c.poster_path)
                    .sort((a, b) => b.popularity - a.popularity);
                setMovieCredits(movies);
                setTvCredits(tv);
            })
            .catch(err => { if (err.name !== 'AbortError') console.error(err); });

        return () => controller.abort();
    }, [personId]);

    return { person, movieCredits, tvCredits };
};

export default usePersonDetails;

import { useEffect, useState } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';

const usePersonDetails = (personId) => {
    const [person, setPerson] = useState(null);
    const [movieCredits, setMovieCredits] = useState([]);
    const [tvCredits, setTvCredits] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${personId}?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setPerson(data))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/person/${personId}/combined_credits?language=en-US`, TMDB_OPTIONS)
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
            .catch(err => console.error(err));
    }, [personId]);

    return { person, movieCredits, tvCredits };
};

export default usePersonDetails;

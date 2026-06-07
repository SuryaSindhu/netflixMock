import { useEffect, useState } from 'react';
import { TMDB_OPTIONS, TMDB_BASE_URL, pickTrailer } from '../utils/constants';

const useMovieDetails = (movieId) => {
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailerId, setTrailerId] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [certification, setCertification] = useState(null);
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        const options = { ...TMDB_OPTIONS, signal };

        setMovie(null);
        setCast([]);
        setTrailerId(null);
        setSimilar([]);
        setRecommendations([]);
        setGenreMovies([]);
        setCertification(null);
        setProviders(null);

        // Single combined request using append_to_response
        fetch(
            `${TMDB_BASE_URL}/movie/${movieId}?language=en-US&append_to_response=credits,videos,similar,recommendations,release_dates,watch/providers`,
            options
        )
            .then(res => res.json())
            .then(data => {
                setMovie(data);

                // Credits
                setCast(data.credits?.cast || []);

                // Trailer
                const video = pickTrailer(data.videos?.results);
                if (video) setTrailerId(video.key);

                // Similar & Recommendations
                setSimilar((data.similar?.results || []).map(m => ({ ...m, media_type: 'movie' })));
                setRecommendations((data.recommendations?.results || []).map(m => ({ ...m, media_type: 'movie' })));

                // Certification
                const releaseDates = data.release_dates?.results;
                const india = releaseDates?.find(r => r.iso_3166_1 === 'IN');
                const us = releaseDates?.find(r => r.iso_3166_1 === 'US');
                const entry = india || us;
                if (entry) {
                    const cert = entry.release_dates.find(d => d.certification)?.certification;
                    if (cert) setCertification(cert);
                }

                // Watch Providers
                const wpResults = data['watch/providers']?.results;
                const region = wpResults?.IN || wpResults?.US;
                if (region) setProviders(region);

                // Genre-based discovery (depends on genres from main response)
                if (data.genres?.length > 0) {
                    const genreIds = data.genres.map(g => g.id).join(',');
                    fetch(`${TMDB_BASE_URL}/discover/movie?with_genres=${genreIds}&language=en-US&page=1&sort_by=popularity.desc`, options)
                        .then(res => res.json())
                        .then(res => setGenreMovies((res.results?.filter(m => m.id !== data.id) || []).map(m => ({ ...m, media_type: 'movie' }))))
                        .catch(err => { if (err.name !== 'AbortError') console.error(err); });
                }
            })
            .catch(err => { if (err.name !== 'AbortError') console.error(err); });

        return () => controller.abort();
    }, [movieId]);

    return { movie, cast, trailerId, similar, recommendations, genreMovies, certification, providers };
};

export default useMovieDetails;

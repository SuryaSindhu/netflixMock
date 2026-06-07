import { useEffect, useState } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';

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

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                if (data.genres?.length > 0) {
                    const genreIds = data.genres.map(g => g.id).join(',');
                    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreIds}&language=en-US&page=1&sort_by=popularity.desc`, options)
                        .then(res => res.json())
                        .then(res => setGenreMovies((res.results?.filter(m => m.id !== data.id) || []).map(m => ({ ...m, media_type: 'movie' }))))
                        .catch(err => { if (err.name !== 'AbortError') console.error(err); });
                }
            })
            .catch(err => { if (err.name !== 'AbortError') console.error(err); });

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
            .then(res => res.json())
            .then(data => setCast(data.cast || []))
            .catch(err => { if (err.name !== 'AbortError') console.error(err); });

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(data => {
                const video = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
                    || data.results.find(v => v.type === 'Teaser' && v.site === 'YouTube')
                    || data.results.find(v => v.type === 'Clip' && v.site === 'YouTube')
                    || data.results.find(v => v.site === 'YouTube');
                if (video) setTrailerId(video.key);
            })
            .catch(err => { if (err.name !== 'AbortError') console.error(err); });

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(data => setSimilar((data.results || []).map(m => ({ ...m, media_type: 'movie' }))))
            .catch(err => { if (err.name !== 'AbortError') console.error(err); });

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(data => setRecommendations((data.results || []).map(m => ({ ...m, media_type: 'movie' }))))
            .catch(err => { if (err.name !== 'AbortError') console.error(err); });

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates`, options)
            .then(res => res.json())
            .then(data => {
                const india = data.results?.find(r => r.iso_3166_1 === 'IN');
                const us = data.results?.find(r => r.iso_3166_1 === 'US');
                const entry = india || us;
                if (entry) {
                    const cert = entry.release_dates.find(d => d.certification)?.certification;
                    if (cert) setCertification(cert);
                }
            })
            .catch(err => { if (err.name !== 'AbortError') console.error(err); });

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, options)
            .then(res => res.json())
            .then(data => {
                const region = data.results?.IN || data.results?.US;
                if (region) setProviders(region);
            })
            .catch(err => { if (err.name !== 'AbortError') console.error(err); });

        return () => controller.abort();
    }, [movieId]);

    return { movie, cast, trailerId, similar, recommendations, genreMovies, certification, providers };
};

export default useMovieDetails;

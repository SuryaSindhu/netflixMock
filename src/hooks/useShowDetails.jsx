import { useEffect, useState } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';

const useShowDetails = (movieId) => {
    const [show, setShow] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailerId, setTrailerId] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [genreShows, setGenreShows] = useState([]);
    const [contentRating, setContentRating] = useState(null);
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        setTrailerId(null);

        fetch(`https://api.themoviedb.org/3/tv/${movieId}?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => {
                setShow(data);
                if (data.genres?.length > 0) {
                    const genreIds = data.genres.map(g => g.id).join(',');
                    fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${genreIds}&language=en-US&page=1&sort_by=popularity.desc`, TMDB_OPTIONS)
                        .then(res => res.json())
                        .then(res => setGenreShows((res.results?.filter(s => s.id !== data.id) || []).map(s => ({ ...s, media_type: 'tv' }))))
                        .catch(err => console.error(err));
                }
            })
            .catch(err => console.error(err));

        // Try season 1 videos first, fallback to show-level videos
        fetch(`https://api.themoviedb.org/3/tv/${movieId}/season/1/videos?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => {
                const video = data.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
                    || data.results?.find(v => v.type === 'Teaser' && v.site === 'YouTube')
                    || data.results?.find(v => v.type === 'Clip' && v.site === 'YouTube')
                    || data.results?.find(v => v.site === 'YouTube');
                if (video) {
                    setTrailerId(video.key);
                } else {
                    fetch(`https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`, TMDB_OPTIONS)
                        .then(res => res.json())
                        .then(data2 => {
                            const vid = data2.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
                                || data2.results?.find(v => v.type === 'Teaser' && v.site === 'YouTube')
                                || data2.results?.find(v => v.type === 'Clip' && v.site === 'YouTube')
                                || data2.results?.find(v => v.site === 'YouTube');
                            if (vid) setTrailerId(vid.key);
                        })
                        .catch(() => {});
                }
            })
            .catch(() => {
                fetch(`https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`, TMDB_OPTIONS)
                    .then(res => res.json())
                    .then(data2 => {
                        const vid = data2.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
                            || data2.results?.find(v => v.type === 'Teaser' && v.site === 'YouTube')
                            || data2.results?.find(v => v.type === 'Clip' && v.site === 'YouTube')
                            || data2.results?.find(v => v.site === 'YouTube');
                        if (vid) setTrailerId(vid.key);
                    })
                    .catch(() => {});
            });

        fetch(`https://api.themoviedb.org/3/tv/${movieId}/credits?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setCast(data.cast || []))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/tv/${movieId}/similar?language=en-US&page=1`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setSimilar((data.results || []).map(s => ({ ...s, media_type: 'tv' }))))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/tv/${movieId}/recommendations?language=en-US&page=1`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setRecommendations((data.results || []).map(s => ({ ...s, media_type: 'tv' }))))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/tv/${movieId}/content_ratings`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => {
                const india = data.results?.find(r => r.iso_3166_1 === 'IN');
                const us = data.results?.find(r => r.iso_3166_1 === 'US');
                const entry = india || us;
                if (entry?.rating) setContentRating(entry.rating);
            })
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/tv/${movieId}/watch/providers`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => {
                const region = data.results?.IN || data.results?.US;
                if (region) setProviders(region);
            })
            .catch(err => console.error(err));
    }, [movieId]);

    return { show, cast, trailerId, similar, recommendations, genreShows, contentRating, providers };
};

export default useShowDetails;

import { useEffect, useState } from 'react';
import { TMDB_OPTIONS, TMDB_BASE_URL, pickTrailer } from '../utils/constants';

const useShowDetails = (showId) => {
    const [show, setShow] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailerId, setTrailerId] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [genreShows, setGenreShows] = useState([]);
    const [contentRating, setContentRating] = useState(null);
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        const options = { ...TMDB_OPTIONS, signal };

        setShow(null);
        setCast([]);
        setTrailerId(null);
        setSimilar([]);
        setRecommendations([]);
        setGenreShows([]);
        setContentRating(null);
        setProviders(null);

        // Single combined request using append_to_response
        fetch(
            `${TMDB_BASE_URL}/tv/${showId}?language=en-US&append_to_response=credits,videos,similar,recommendations,content_ratings,watch/providers`,
            options
        )
            .then(res => res.json())
            .then(data => {
                setShow(data);

                // Credits
                setCast(data.credits?.cast || []);

                // Trailer — try show-level videos first
                const video = pickTrailer(data.videos?.results);
                if (video) {
                    setTrailerId(video.key);
                } else {
                    // Fallback: try season 1 videos (can't be appended)
                    fetch(`${TMDB_BASE_URL}/tv/${showId}/season/1/videos?language=en-US`, options)
                        .then(res => res.json())
                        .then(seasonData => {
                            const vid = pickTrailer(seasonData.results);
                            if (vid) setTrailerId(vid.key);
                        })
                        .catch(err => { if (err.name !== 'AbortError') console.error(err); });
                }

                // Similar & Recommendations
                setSimilar((data.similar?.results || []).map(s => ({ ...s, media_type: 'tv' })));
                setRecommendations((data.recommendations?.results || []).map(s => ({ ...s, media_type: 'tv' })));

                // Content Rating
                const ratings = data.content_ratings?.results;
                const india = ratings?.find(r => r.iso_3166_1 === 'IN');
                const us = ratings?.find(r => r.iso_3166_1 === 'US');
                const entry = india || us;
                if (entry?.rating) setContentRating(entry.rating);

                // Watch Providers
                const wpResults = data['watch/providers']?.results;
                const region = wpResults?.IN || wpResults?.US;
                if (region) setProviders(region);

                // Genre-based discovery (depends on genres from main response)
                if (data.genres?.length > 0) {
                    const genreIds = data.genres.map(g => g.id).join(',');
                    fetch(`${TMDB_BASE_URL}/discover/tv?with_genres=${genreIds}&language=en-US&page=1&sort_by=popularity.desc`, options)
                        .then(res => res.json())
                        .then(res => setGenreShows((res.results?.filter(s => s.id !== data.id) || []).map(s => ({ ...s, media_type: 'tv' }))))
                        .catch(err => { if (err.name !== 'AbortError') console.error(err); });
                }
            })
            .catch(err => { if (err.name !== 'AbortError') console.error(err); });

        return () => controller.abort();
    }, [showId]);

    return { show, cast, trailerId, similar, recommendations, genreShows, contentRating, providers };
};

export default useShowDetails;

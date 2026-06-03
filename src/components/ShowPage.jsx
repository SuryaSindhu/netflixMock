import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { TMDB_OPTIONS } from '../utils/constants';
import { ShowPageShimmer } from './Shimmer';
import MovieList from './MovieList';
import EpisodeList from './EpisodeList';

const IMG_CDN = "https://image.tmdb.org/t/p/w500";

const ShowPage = () => {
    const { movieId } = useParams();
    const [show, setShow] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailerId, setTrailerId] = useState(null);
    const [noVideo, setNoVideo] = useState(false);
    const [similar, setSimilar] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [genreShows, setGenreShows] = useState([]);
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTopBtn(window.scrollY > 600);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [movieId]);

    useEffect(() => {
        setTrailerId(null);
        setNoVideo(false);

        fetch(`https://api.themoviedb.org/3/tv/${movieId}?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => {
                setShow(data);
                if (data.genres?.length > 0) {
                    const genreIds = data.genres.map(g => g.id).join(',');
                    fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${genreIds}&language=en-US&page=1&sort_by=popularity.desc`, TMDB_OPTIONS)
                        .then(res => res.json())
                        .then(res => setGenreShows(res.results?.filter(s => s.id !== data.id) || []))
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
                    // Fallback to show-level videos
                    fetch(`https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`, TMDB_OPTIONS)
                        .then(res => res.json())
                        .then(data2 => {
                            const vid = data2.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
                                || data2.results?.find(v => v.type === 'Teaser' && v.site === 'YouTube')
                                || data2.results?.find(v => v.type === 'Clip' && v.site === 'YouTube')
                                || data2.results?.find(v => v.site === 'YouTube');
                            if (vid) {
                                setTrailerId(vid.key);
                            } else {
                                setNoVideo(true);
                            }
                        })
                        .catch(() => setNoVideo(true));
                }
            })
            .catch(() => {
                // If season 1 videos endpoint fails, try show-level
                fetch(`https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`, TMDB_OPTIONS)
                    .then(res => res.json())
                    .then(data2 => {
                        const vid = data2.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
                            || data2.results?.find(v => v.type === 'Teaser' && v.site === 'YouTube')
                            || data2.results?.find(v => v.type === 'Clip' && v.site === 'YouTube')
                            || data2.results?.find(v => v.site === 'YouTube');
                        if (vid) {
                            setTrailerId(vid.key);
                        } else {
                            setNoVideo(true);
                        }
                    })
                    .catch(() => setNoVideo(true));
            });

        fetch(`https://api.themoviedb.org/3/tv/${movieId}/credits?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setCast(data.cast || []))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/tv/${movieId}/similar?language=en-US&page=1`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setSimilar(data.results || []))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/tv/${movieId}/recommendations?language=en-US&page=1`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setRecommendations(data.results || []))
            .catch(err => console.error(err));
    }, [movieId]);

    if (!show) return <ShowPageShimmer />;

    return (
        <div className="bg-black min-h-screen">
            {/* Trailer section */}
            <div className="w-full max-w-5xl mx-auto bg-black pt-20">
                {trailerId ? (
                    <iframe
                        className="w-full aspect-video"
                        src={`https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&mute=1&loop=1&playlist=${trailerId}&controls=1&modestbranding=1&rel=0`}
                        title="Show Trailer"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                ) : noVideo && show.backdrop_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                        alt={show.name}
                        className="w-full aspect-video object-cover rounded"
                    />
                ) : (
                    <div className="w-full aspect-video bg-zinc-900 flex items-center justify-center">
                        <span className="text-gray-500 text-xl">Loading trailer...</span>
                    </div>
                )}
            </div>

            {/* Show Details */}
            <div className="px-12 py-8 text-white">
                <div className="flex gap-8">
                    {/* Poster */}
                    <img
                        src={IMG_CDN + show.poster_path}
                        alt={show.name}
                        className="w-64 rounded-md shadow-lg flex-shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold">{show.name}</h1>

                        {show.tagline && (
                            <p className="text-gray-400 italic mt-2">"{show.tagline}"</p>
                        )}

                        <div className="flex items-center gap-4 mt-4 text-sm">
                            <span className="text-green-400 font-semibold text-lg">
                                {Math.round(show.vote_average * 10)}% Match
                            </span>
                            <span className="text-gray-400">{show.first_air_date?.split('-')[0]}</span>
                            {show.number_of_seasons && (
                                <span className="text-gray-400">
                                    {show.number_of_seasons} Season{show.number_of_seasons > 1 ? 's' : ''}
                                </span>
                            )}
                            {show.number_of_episodes && (
                                <span className="text-gray-400">
                                    {show.number_of_episodes} Episodes
                                </span>
                            )}
                            <span className="border border-gray-500 px-2 py-0.5 text-xs text-gray-300">
                                {show.adult ? 'A' : 'U/A'}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {show.genres?.map((genre) => (
                                <span key={genre.id} className="text-sm text-gray-300 border border-gray-600 rounded-full px-3 py-1">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-300 mt-6 leading-relaxed text-base">{show.overview}</p>

                        {/* Additional details */}
                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                            {show.production_companies?.length > 0 && (
                                <div>
                                    <span className="text-gray-500">Production: </span>
                                    <span className="text-gray-300">
                                        {show.production_companies.map(c => c.name).join(', ')}
                                    </span>
                                </div>
                            )}
                            {show.spoken_languages?.length > 0 && (
                                <div>
                                    <span className="text-gray-500">Languages: </span>
                                    <span className="text-gray-300">
                                        {show.spoken_languages.map(l => l.english_name).join(', ')}
                                    </span>
                                </div>
                            )}
                            {show.networks?.length > 0 && (
                                <div>
                                    <span className="text-gray-500">Network: </span>
                                    <span className="text-gray-300">
                                        {show.networks.map(n => n.name).join(', ')}
                                    </span>
                                </div>
                            )}
                            {show.vote_count > 0 && (
                                <div>
                                    <span className="text-gray-500">Votes: </span>
                                    <span className="text-gray-300">{show.vote_count.toLocaleString()}</span>
                                </div>
                            )}
                            {show.status && (
                                <div>
                                    <span className="text-gray-500">Status: </span>
                                    <span className="text-gray-300">{show.status}</span>
                                </div>
                            )}
                            {show.type && (
                                <div>
                                    <span className="text-gray-500">Type: </span>
                                    <span className="text-gray-300">{show.type}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Cast Section */}
                {cast.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
                        <div className="flex overflow-x-scroll gap-4 pb-4 scrollbar-hide">
                            {cast.slice(0, 20).map((actor) => (
                                <div key={actor.id} className="flex-shrink-0 w-32 text-center">
                                    {actor.profile_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                            alt={actor.name}
                                            className="w-32 h-32 object-cover rounded-full"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center text-gray-500 text-3xl">
                                            👤
                                        </div>
                                    )}
                                    <p className="text-white text-sm mt-2 font-medium">{actor.name}</p>
                                    <p className="text-gray-400 text-xs">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Episodes Section */}
                {show.number_of_seasons > 0 && (
                    <EpisodeList showId={movieId} numberOfSeasons={show.number_of_seasons} />
                )}

                {/* Similar Shows */}
                {similar.length > 0 && (
                    <MovieList title="Similar Shows" movies={similar} />
                )}

                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <MovieList title="Recommendations" movies={recommendations} />
                )}

                {/* Same Genre */}
                {genreShows.length > 0 && (
                    <MovieList title={`More in ${show.genres?.map(g => g.name).join(' & ')}`} movies={genreShows} />
                )}
            </div>

            {/* Go to Top */}
            {showTopBtn && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-50 bg-zinc-800 hover:bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
                    aria-label="Go to top"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default ShowPage;

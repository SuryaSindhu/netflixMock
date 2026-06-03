import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { TMDB_OPTIONS } from '../utils/constants';
import { PlayPageShimmer } from './Shimmer';
import MovieList from './MovieList';

const IMG_CDN = "https://image.tmdb.org/t/p/w500";

const PlayPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailerId, setTrailerId] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [movieId]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                // Fetch movies from same genre once we have genre IDs
                if (data.genres?.length > 0) {
                    const genreIds = data.genres.map(g => g.id).join(',');
                    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreIds}&language=en-US&page=1&sort_by=popularity.desc`, TMDB_OPTIONS)
                        .then(res => res.json())
                        .then(res => setGenreMovies(res.results?.filter(m => m.id !== data.id) || []))
                        .catch(err => console.error(err));
                }
            })
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setCast(data.cast || []))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => {
                const trailer = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
                if (trailer) setTrailerId(trailer.key);
            })
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setSimilar(data.results || []))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setRecommendations(data.results || []))
            .catch(err => console.error(err));
    }, [movieId]);

    if (!movie) return <PlayPageShimmer />;

    return (
        <div className="bg-black min-h-screen">
            {/* Trailer section - reduced height */}
            <div className="w-full max-w-5xl mx-auto bg-black pt-20">
                {trailerId ? (
                    <iframe
                        className="w-full aspect-video"
                        src={`https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&mute=1&loop=1&playlist=${trailerId}&controls=1&modestbranding=1&rel=0`}
                        title="Movie Trailer"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                ) : (
                    <div className="w-full aspect-video bg-zinc-900 flex items-center justify-center">
                        <span className="text-gray-500 text-xl">Loading trailer...</span>
                    </div>
                )}
            </div>

            {/* Movie Details */}
            <div className="px-12 py-8 text-white">
                <div className="flex gap-8">
                    {/* Poster */}
                    <img
                        src={IMG_CDN + movie.poster_path}
                        alt={movie.title}
                        className="w-64 rounded-md shadow-lg flex-shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold">{movie.title}</h1>

                        {movie.tagline && (
                            <p className="text-gray-400 italic mt-2">"{movie.tagline}"</p>
                        )}

                        <div className="flex items-center gap-4 mt-4 text-sm">
                            <span className="text-green-400 font-semibold text-lg">
                                {Math.round(movie.vote_average * 10)}% Match
                            </span>
                            <span className="text-gray-400">{movie.release_date?.split('-')[0]}</span>
                            {movie.runtime && (
                                <span className="text-gray-400">
                                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                                </span>
                            )}
                            <span className="border border-gray-500 px-2 py-0.5 text-xs text-gray-300">
                                {movie.adult ? 'A' : 'U/A'}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {movie.genres?.map((genre) => (
                                <span key={genre.id} className="text-sm text-gray-300 border border-gray-600 rounded-full px-3 py-1">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-300 mt-6 leading-relaxed text-base">{movie.overview}</p>

                        {/* Additional details */}
                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                            {movie.production_companies?.length > 0 && (
                                <div>
                                    <span className="text-gray-500">Production: </span>
                                    <span className="text-gray-300">
                                        {movie.production_companies.map(c => c.name).join(', ')}
                                    </span>
                                </div>
                            )}
                            {movie.spoken_languages?.length > 0 && (
                                <div>
                                    <span className="text-gray-500">Languages: </span>
                                    <span className="text-gray-300">
                                        {movie.spoken_languages.map(l => l.english_name).join(', ')}
                                    </span>
                                </div>
                            )}
                            {movie.budget > 0 && (
                                <div>
                                    <span className="text-gray-500">Budget: </span>
                                    <span className="text-gray-300">${(movie.budget / 1000000).toFixed(0)}M</span>
                                </div>
                            )}
                            {movie.revenue > 0 && (
                                <div>
                                    <span className="text-gray-500">Revenue: </span>
                                    <span className="text-gray-300">${(movie.revenue / 1000000).toFixed(0)}M</span>
                                </div>
                            )}
                            {movie.vote_count > 0 && (
                                <div>
                                    <span className="text-gray-500">Votes: </span>
                                    <span className="text-gray-300">{movie.vote_count.toLocaleString()}</span>
                                </div>
                            )}
                            {movie.status && (
                                <div>
                                    <span className="text-gray-500">Status: </span>
                                    <span className="text-gray-300">{movie.status}</span>
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

                {/* Similar Movies */}
                {similar.length > 0 && (
                    <MovieList title="Similar Movies" movies={similar} />
                )}

                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <MovieList title="Recommendations" movies={recommendations} />
                )}

                {/* Same Genre */}
                {genreMovies.length > 0 && (
                    <MovieList title={`More in ${movie.genres?.map(g => g.name).join(' & ')}`} movies={genreMovies} />
                )}
            </div>
        </div>
    );
}

export default PlayPage;

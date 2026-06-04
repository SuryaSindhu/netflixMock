import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { TMDB_OPTIONS } from '../utils/constants';
import { PlayPageShimmer } from '../components/Shimmer';
import MovieList from '../components/MovieList';
import TrailerPlayer from '../components/TrailerPlayer';

const IMG_CDN = "https://image.tmdb.org/t/p/w500";

const PlayPage = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailerId, setTrailerId] = useState(null);
    const [noVideo, setNoVideo] = useState(false);
    const [similar, setSimilar] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [certification, setCertification] = useState(null);
    const [providers, setProviders] = useState(null);

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
                        .then(res => setGenreMovies((res.results?.filter(m => m.id !== data.id) || []).map(m => ({ ...m, media_type: 'movie' }))))
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
                const video = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
                    || data.results.find(v => v.type === 'Teaser' && v.site === 'YouTube')
                    || data.results.find(v => v.type === 'Clip' && v.site === 'YouTube')
                    || data.results.find(v => v.site === 'YouTube');
                if (video) {
                    setTrailerId(video.key);
                } else {
                    setNoVideo(true);
                }
            })
            .catch(err => {
                console.error(err);
                setNoVideo(true);
            });

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setSimilar((data.results || []).map(m => ({ ...m, media_type: 'movie' }))))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setRecommendations((data.results || []).map(m => ({ ...m, media_type: 'movie' }))))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates`, TMDB_OPTIONS)
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
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => {
                const region = data.results?.IN || data.results?.US;
                if (region) setProviders(region);
            })
            .catch(err => console.error(err));
    }, [movieId]);

    if (!movie) return <PlayPageShimmer />;

    const ratingColor = movie.vote_average >= 7 ? 'text-green-400' : movie.vote_average >= 5 ? 'text-yellow-400' : 'text-red-400';
    const ratingBg = movie.vote_average >= 7 ? 'bg-green-500/10 border-green-500/30' : movie.vote_average >= 5 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-red-500/10 border-red-500/30';

    return (
        <div className="bg-zinc-950 min-h-screen">
            {/* === DESKTOP LAYOUT === */}
            <div className="hidden md:block pt-20">
                {/* Trailer section */}
                <TrailerPlayer trailerId={trailerId} backdropPath={movie.backdrop_path} posterPath={movie.poster_path} title={movie.title} />

                {/* Info section below trailer */}
                <div className="relative px-12 -mt-28 z-10 text-white">
                    <div className="flex gap-8">
                        {/* Poster - overlaps trailer */}
                        {movie.poster_path && (
                            <div className="flex-shrink-0">
                                <img
                                    src={IMG_CDN + movie.poster_path}
                                    alt={movie.title}
                                    className="w-60 rounded-xl shadow-2xl shadow-black/90 border border-white/10 ring-1 ring-black/50"
                                />
                            </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0 pt-28">
                            <h1 className="text-5xl font-bold leading-tight tracking-tight">
                                {movie.title}
                            </h1>
                            {movie.tagline && (
                                <p className="text-gray-400 italic mt-2 text-lg font-light">
                                    "{movie.tagline}"
                                </p>
                            )}

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-3 mt-5">
                                {movie.vote_average > 0 && (
                                    <span className={`${ratingColor} ${ratingBg} border font-bold px-3 py-1.5 rounded-lg text-base`}>
                                        ★ {movie.vote_average.toFixed(1)}<span className="text-[9px] font-normal opacity-70 ml-1">TMDB</span>
                                    </span>
                                )}
                                <span className="text-gray-300 text-base">{movie.release_date?.split('-')[0]}</span>
                                {movie.runtime > 0 && (
                                    <span className="text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full">
                                        {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                                    </span>
                                )}
                                {certification && (
                                    <span className="border border-gray-500 px-2.5 py-1 text-xs text-gray-200 font-semibold rounded-md bg-white/5">
                                        {certification}
                                    </span>
                                )}
                            </div>

                            {/* Genres as pills */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {movie.genres?.map((genre) => (
                                    <span key={genre.id} className="text-sm text-white/90 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 font-medium">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            {/* Overview */}
                            <p className="text-gray-300 text-[15px] leading-relaxed mt-6 max-w-3xl">
                                {movie.overview}
                            </p>

                            {/* Quick facts inline */}
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
                                {movie.production_companies?.length > 0 && (
                                    <div>
                                        <span className="text-gray-500">Studio</span>{' '}
                                        <span className="text-gray-200 font-medium">{movie.production_companies.slice(0, 2).map(c => c.name).join(', ')}</span>
                                    </div>
                                )}
                                {movie.spoken_languages?.length > 0 && (
                                    <div>
                                        <span className="text-gray-500">Language</span>{' '}
                                        <span className="text-gray-200 font-medium">{movie.spoken_languages.slice(0, 2).map(l => l.english_name).join(', ')}</span>
                                    </div>
                                )}
                                {movie.budget > 0 && (
                                    <div>
                                        <span className="text-gray-500">Budget</span>{' '}
                                        <span className="text-gray-200 font-medium">${(movie.budget / 1000000).toFixed(0)}M</span>
                                    </div>
                                )}
                                {movie.revenue > 0 && (
                                    <div>
                                        <span className="text-gray-500">Revenue</span>{' '}
                                        <span className="text-gray-200 font-medium">${(movie.revenue / 1000000).toFixed(0)}M</span>
                                    </div>
                                )}
                                {movie.status && (
                                    <div>
                                        <span className="text-gray-500">Status</span>{' '}
                                        <span className="text-gray-200 font-medium">{movie.status}</span>
                                    </div>
                                )}
                            </div>

                            {/* Watch Providers */}
                            {providers && (
                                <div className="mt-6">
                                    <h3 className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-widest">Where to Watch</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {providers.flatrate?.map(p => (
                                            <div key={p.provider_id} className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors cursor-default">
                                                <img src={`https://image.tmdb.org/t/p/w45${p.logo_path}`} alt={p.provider_name} className="w-5 h-5 rounded" />
                                                <span className="text-gray-200 text-xs">{p.provider_name}</span>
                                            </div>
                                        ))}
                                        {providers.rent?.map(p => (
                                            <div key={p.provider_id} className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors cursor-default">
                                                <img src={`https://image.tmdb.org/t/p/w45${p.logo_path}`} alt={p.provider_name} className="w-5 h-5 rounded" />
                                                <span className="text-gray-200 text-xs">{p.provider_name}</span>
                                                <span className="text-gray-500 text-[10px]">Rent</span>
                                            </div>
                                        ))}
                                        {providers.buy?.map(p => (
                                            <div key={p.provider_id} className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors cursor-default">
                                                <img src={`https://image.tmdb.org/t/p/w45${p.logo_path}`} alt={p.provider_name} className="w-5 h-5 rounded" />
                                                <span className="text-gray-200 text-xs">{p.provider_name}</span>
                                                <span className="text-gray-500 text-[10px]">Buy</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cast Section */}
                    {cast.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-lg font-semibold text-white mb-5 uppercase tracking-widest">Cast</h2>
                            <div className="flex overflow-x-scroll gap-4 pb-4 scrollbar-hide">
                                {cast.slice(0, 20).map((actor) => (
                                    <div
                                        key={actor.id}
                                        className="flex-shrink-0 w-28 text-center cursor-pointer group"
                                        onClick={() => navigate(`/person/${actor.id}`)}
                                    >
                                        {actor.profile_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                                alt={actor.name}
                                                className="w-28 h-28 object-cover rounded-full ring-2 ring-white/10 group-hover:ring-red-500/70 transition-all duration-300"
                                            />
                                        ) : (
                                            <div className="w-28 h-28 rounded-full bg-zinc-800 flex items-center justify-center text-gray-500 text-3xl ring-2 ring-white/10 group-hover:ring-red-500/70 transition-all duration-300">
                                                👤
                                            </div>
                                        )}
                                        <p className="text-white text-xs mt-2 font-medium group-hover:text-red-400 transition-colors truncate">{actor.name}</p>
                                        <p className="text-gray-500 text-[10px] truncate">{actor.character}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Movie Lists */}
                    <div className="mt-8 space-y-2">
                        {similar.length > 0 && <MovieList title="Similar Movies" movies={similar} />}
                        {recommendations.length > 0 && <MovieList title="Recommendations" movies={recommendations} />}
                        {genreMovies.length > 0 && <MovieList title={`More in ${movie.genres?.map(g => g.name).join(' & ')}`} movies={genreMovies} />}
                    </div>
                </div>
            </div>

            {/* === MOBILE LAYOUT === */}
            <div className="md:hidden pt-16">
                {/* Mobile: Trailer */}
                {trailerId ? (
                    <div className="w-full">
                        <iframe
                            className="w-full aspect-video"
                            src={`https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&mute=1&loop=1&playlist=${trailerId}&controls=1&modestbranding=1&rel=0`}
                            title="Movie Trailer"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    </div>
                ) : movie.backdrop_path ? (
                    <div className="w-full h-[30vh] relative">
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                    </div>
                ) : movie.poster_path ? (
                    <div className="w-full h-[30vh] relative bg-zinc-900 flex items-center justify-center">
                        <img
                            src={IMG_CDN + movie.poster_path}
                            alt={movie.title}
                            className="h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                    </div>
                ) : null}

                {/* Mobile: Info Section */}
                <div className="px-4 pt-5 pb-4 text-white">
                    <h1 className="text-2xl font-bold leading-tight">
                        {movie.title}
                    </h1>
                    {movie.tagline && (
                        <p className="text-gray-400 italic text-sm mt-1">"{movie.tagline}"</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-3 text-sm">
                        {movie.vote_average > 0 && (
                            <span className={`${ratingColor} ${ratingBg} border font-bold px-2 py-0.5 rounded-md text-sm`}>
                                ★ {movie.vote_average.toFixed(1)}<span className="text-[8px] font-normal opacity-70 ml-1">TMDB</span>
                            </span>
                        )}
                        <span className="text-gray-300">{movie.release_date?.split('-')[0]}</span>
                        {movie.runtime > 0 && (
                            <span className="text-gray-300">
                                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                            </span>
                        )}
                        {certification && (
                            <span className="border border-gray-400/50 px-2 py-0.5 text-xs text-gray-200 font-semibold rounded">
                                {certification}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {movie.genres?.map((genre) => (
                            <span key={genre.id} className="text-xs text-white/80 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    {/* Overview */}
                    <p className="text-gray-300 text-sm leading-relaxed mt-4">
                        {movie.overview}
                    </p>
                </div>
            </div>

            {/* Mobile Content Section */}
            <div className="md:hidden px-4 py-4 text-white">

                {/* Info Cards Row */}
                <div className="grid grid-cols-2 gap-3">
                    {movie.production_companies?.length > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Studio</p>
                            <p className="text-gray-200 text-xs font-medium">
                                {movie.production_companies.slice(0, 2).map(c => c.name).join(', ')}
                            </p>
                        </div>
                    )}
                    {movie.spoken_languages?.length > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Language</p>
                            <p className="text-gray-200 text-xs font-medium">
                                {movie.spoken_languages.slice(0, 3).map(l => l.english_name).join(', ')}
                            </p>
                        </div>
                    )}
                    {movie.budget > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Budget</p>
                            <p className="text-gray-200 text-xs font-medium">${(movie.budget / 1000000).toFixed(0)}M</p>
                        </div>
                    )}
                    {movie.revenue > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Revenue</p>
                            <p className="text-gray-200 text-xs font-medium">${(movie.revenue / 1000000).toFixed(0)}M</p>
                        </div>
                    )}
                    {movie.vote_count > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Votes</p>
                            <p className="text-gray-200 text-xs font-medium">{movie.vote_count.toLocaleString()}</p>
                        </div>
                    )}
                    {movie.status && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Status</p>
                            <p className="text-gray-200 text-xs font-medium">{movie.status}</p>
                        </div>
                    )}
                </div>

                {/* Watch Providers */}
                {providers && (
                    <div className="mt-6">
                        <h3 className="text-sm text-gray-400 font-semibold mb-3 uppercase tracking-wider">Available On</h3>
                        <div className="flex flex-wrap gap-2">
                            {providers.flatrate?.map(p => (
                                <div key={p.provider_id} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                                    <img src={`https://image.tmdb.org/t/p/w45${p.logo_path}`} alt={p.provider_name} className="w-7 h-7 rounded-md" />
                                    <span className="text-gray-200 text-xs">{p.provider_name}</span>
                                </div>
                            ))}
                            {providers.rent?.map(p => (
                                <div key={p.provider_id} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                                    <img src={`https://image.tmdb.org/t/p/w45${p.logo_path}`} alt={p.provider_name} className="w-7 h-7 rounded-md" />
                                    <span className="text-gray-200 text-xs">{p.provider_name}</span>
                                    <span className="text-gray-500 text-[10px]">Rent</span>
                                </div>
                            ))}
                            {providers.buy?.map(p => (
                                <div key={p.provider_id} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                                    <img src={`https://image.tmdb.org/t/p/w45${p.logo_path}`} alt={p.provider_name} className="w-7 h-7 rounded-md" />
                                    <span className="text-gray-200 text-xs">{p.provider_name}</span>
                                    <span className="text-gray-500 text-[10px]">Buy</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cast Section */}
                {cast.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">Cast</h2>
                        <div className="flex overflow-x-scroll gap-3 pb-4 scrollbar-hide">
                            {cast.slice(0, 20).map((actor) => (
                                <div
                                    key={actor.id}
                                    className="flex-shrink-0 w-24 text-center cursor-pointer group"
                                    onClick={() => navigate(`/person/${actor.id}`)}
                                >
                                    {actor.profile_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                            alt={actor.name}
                                            className="w-24 h-24 object-cover rounded-full ring-2 ring-white/10 group-hover:ring-red-500 transition-all"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center text-gray-500 text-2xl ring-2 ring-white/10 group-hover:ring-red-500 transition-all">
                                            👤
                                        </div>
                                    )}
                                    <p className="text-white text-xs mt-2 font-medium group-hover:text-red-400 transition-colors truncate">{actor.name}</p>
                                    <p className="text-gray-500 text-[10px] truncate">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Movie Lists */}
                <div className="mt-6 space-y-2">
                    {similar.length > 0 && <MovieList title="Similar Movies" movies={similar} />}
                    {recommendations.length > 0 && <MovieList title="Recommendations" movies={recommendations} />}
                    {genreMovies.length > 0 && <MovieList title={`More in ${movie.genres?.map(g => g.name).join(' & ')}`} movies={genreMovies} />}
                </div>
            </div>
        </div>
    );
}

export default PlayPage;

import React, { useState, useEffect, useRef } from 'react';
import { TMDB_OPTIONS } from '../../utils/constants';
import MovieList from '../../components/MovieList';
import { useAppContext } from '../../context/AppContext';

const GenreSearch = () => {
    const { searchCache, setSearchCache } = useAppContext();
    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState(searchCache.selectedGenres);
    const [results, setResults] = useState(searchCache.genreResults);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(searchCache.genreSearched);
    const resultsRef = useRef(null);

    // Save to cache whenever genre state changes
    useEffect(() => {
        setSearchCache(prev => ({ ...prev, selectedGenres, genreResults: results, genreSearched: searched }));
    }, [selectedGenres, results, searched, setSearchCache]);

    // Fetch genre lists
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US', TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setMovieGenres(data.genres || []))
            .catch(err => console.error(err));

        fetch('https://api.themoviedb.org/3/genre/tv/list?language=en-US', TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setTvGenres(data.genres || []))
            .catch(err => console.error(err));
    }, []);

    const toggleGenre = (genre) => {
        if (selectedGenres.find(g => g.id === genre.id)) {
            setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id));
        } else if (selectedGenres.length < 3) {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const getCombinations = (genres) => {
        const combos = [];
        const n = genres.length;

        // All selected (3 or 2 or 1)
        if (n >= 1) combos.push(genres);

        // Pairs (only if 3 selected)
        if (n === 3) {
            combos.push([genres[0], genres[1]]);
            combos.push([genres[0], genres[2]]);
            combos.push([genres[1], genres[2]]);
        }

        // Singles
        if (n >= 2) {
            genres.forEach(g => combos.push([g]));
        }

        return combos;
    };

    const handleDiscover = async () => {
        if (selectedGenres.length === 0) return;

        setLoading(true);
        setSearched(true);

        // On mobile, scroll to results area immediately so loader is visible
        if (window.innerWidth < 768) {
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
        const combos = getCombinations(selectedGenres);
        const seenMovieIds = new Set();
        const seenTvIds = new Set();

        // Fire all fetches in parallel
        const comboPromises = combos.map(async (combo) => {
            const genreIds = combo.map(g => g.id).join(',');
            const genreLabel = combo.map(g => g.name).join(' & ');

            try {
                const [movieRes, tvRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreIds}&language=en-US&page=1&sort_by=popularity.desc`, TMDB_OPTIONS),
                    fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${genreIds}&language=en-US&page=1&sort_by=popularity.desc`, TMDB_OPTIONS),
                ]);

                const [movieData, tvData] = await Promise.all([movieRes.json(), tvRes.json()]);

                const movies = (movieData.results || [])
                    .filter(m => m.poster_path && !seenMovieIds.has(m.id))
                    .map(m => ({ ...m, media_type: 'movie' }));
                movies.forEach(m => seenMovieIds.add(m.id));

                const shows = (tvData.results || [])
                    .filter(s => s.poster_path && !seenTvIds.has(s.id))
                    .map(s => ({ ...s, media_type: 'tv' }));
                shows.forEach(s => seenTvIds.add(s.id));

                if (movies.length > 0 || shows.length > 0) {
                    return { label: genreLabel, matchCount: combo.length, movies, shows };
                }
            } catch (err) {
                console.error(err);
            }
            return null;
        });

        const allResults = (await Promise.all(comboPromises)).filter(Boolean);

        setResults(allResults);
        setLoading(false);
    };

    // Merge all genres (dedup by id)
    const allGenres = [...movieGenres];
    tvGenres.forEach(g => {
        if (!allGenres.find(mg => mg.id === g.id)) allGenres.push(g);
    });

    return (
        <div>
            {/* Genre Picker */}
            <div className="max-w-4xl mx-auto mb-6">
                <p className="text-gray-400 text-sm mb-3 text-center">
                    Pick up to 3 genres — we'll find the best matches
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                    {allGenres.map(genre => {
                        const isSelected = selectedGenres.find(g => g.id === genre.id);
                        const isDisabled = !isSelected && selectedGenres.length >= 3;
                        return (
                            <button
                                key={genre.id}
                                onClick={() => !isDisabled && toggleGenre(genre)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                    isSelected
                                        ? 'bg-red-600 text-white scale-105'
                                        : isDisabled
                                        ? 'bg-zinc-800 text-gray-600 cursor-not-allowed'
                                        : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white cursor-pointer'
                                }`}
                            >
                                {genre.name}
                            </button>
                        );
                    })}
                </div>

                {/* Selected + Discover button */}
                {selectedGenres.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-5">
                        <div className="flex flex-wrap justify-center gap-2">
                            {selectedGenres.map(g => (
                                <span key={g.id} className="bg-red-600/20 border border-red-600 text-red-400 px-3 py-1 rounded-full text-sm flex items-center gap-1 whitespace-nowrap">
                                    {g.name}
                                    <button onClick={() => toggleGenre(g)} className="text-red-300 hover:text-white ml-1">×</button>
                                </span>
                            ))}
                        </div>
                        <button
                            onClick={handleDiscover}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition-colors cursor-pointer"
                        >
                            Discover
                        </button>
                        <button
                            onClick={() => { setSelectedGenres([]); setResults([]); setSearched(false); }}
                            className="bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer border border-zinc-700"
                        >
                            Clear All
                        </button>
                    </div>
                )}
            </div>

            {/* Results area (ref wraps loader + results for scroll target) */}
            <div ref={resultsRef}>
            {/* Loading */}
            {loading && (
                <div className="text-center text-gray-400 py-8">
                    <div className="inline-block w-6 h-6 border-2 border-gray-600 border-t-red-500 rounded-full animate-spin mb-2"></div>
                    <p>Finding matches...</p>
                </div>
            )}

            {/* Results */}
            {!loading && results.length > 0 && (
                <div className="mt-4">
                    {results.map((group, idx) => (
                        <div key={idx}>
                            {group.movies.length > 0 && (
                                <MovieList
                                    title={`${group.label} — Movies`}
                                    movies={group.movies}
                                />
                            )}
                            {group.shows.length > 0 && (
                                <MovieList
                                    title={`${group.label} — Shows`}
                                    movies={group.shows}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* No results */}
            {!loading && searched && results.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                    <p className="text-lg">No results found for this combination</p>
                    <p className="text-sm mt-2">Try different genres</p>
                </div>
            )}
            </div>

            {/* Empty state */}
            {!searched && !loading && (
                <div className="text-center text-gray-500 py-12">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-lg">Mix genres to discover something new</p>
                </div>
            )}
        </div>
    );
};

export default GenreSearch;

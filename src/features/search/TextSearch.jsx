import React, { useState, useEffect, useCallback } from 'react';
import { TMDB_OPTIONS, TMDB_BASE_URL } from '../../utils/constants';
import MovieList from '../../components/shared/MovieList';
import CastSection from '../../components/shared/CastSection';
import { SearchResultsShimmer } from '../../components/shared/Shimmer';
import { useAppContext } from '../../context/AppContext';

const TextSearch = () => {
    const { searchCache, setSearchCache } = useAppContext();
    const [query, setQuery] = useState(searchCache.query);
    const [movieResults, setMovieResults] = useState(searchCache.movieResults);
    const [tvResults, setTvResults] = useState(searchCache.tvResults);
    const [personResults, setPersonResults] = useState(searchCache.personResults);
    const [loading, setLoading] = useState(false);

    // Save to cache whenever results change
    useEffect(() => {
        setSearchCache(prev => ({ ...prev, query, movieResults, tvResults, personResults }));
    }, [query, movieResults, tvResults, personResults, setSearchCache]);

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const searchAPI = (searchQuery) => {
        if (!searchQuery.trim()) {
            setMovieResults([]);
            setTvResults([]);
            setPersonResults([]);
            return;
        }

        setLoading(true);
        fetch(`${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => {
                const results = data.results || [];
                setMovieResults(results.filter(r => r.media_type === 'movie' && r.poster_path));
                setTvResults(results.filter(r => r.media_type === 'tv' && r.poster_path));
                setPersonResults(results.filter(r => r.media_type === 'person'));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(debounce(searchAPI, 500), []);

    useEffect(() => {
        debouncedSearch(query);
    }, [query, debouncedSearch]);

    const hasResults = movieResults.length > 0 || tvResults.length > 0 || personResults.length > 0;

    return (
        <div>
            {/* Search Input */}
            <div className="max-w-2xl mx-auto mb-6 md:mb-8 px-2">
                <div className="relative">
                    <svg className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search movies, TV shows, people..."
                        className="w-full pl-10 md:pl-12 pr-10 py-3 md:py-4 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-base md:text-lg placeholder-gray-500 outline-none focus:border-red-600 transition-colors"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Loading shimmer */}
            {loading && <SearchResultsShimmer />}

            {/* No results */}
            {!loading && query && !hasResults && (
                <div className="text-center text-gray-500 py-12">
                    <p className="text-lg">No results found for "{query}"</p>
                    <p className="text-sm mt-2">Try different keywords</p>
                </div>
            )}

            {/* Results */}
            {!loading && hasResults && (
                <div>
                    {movieResults.length > 0 && (
                        <MovieList title={`Movies (${movieResults.length})`} movies={movieResults} />
                    )}
                    {tvResults.length > 0 && (
                        <MovieList title={`TV Shows (${tvResults.length})`} movies={tvResults} />
                    )}
                    {personResults.length > 0 && (
                        <CastSection
                            cast={personResults}
                            title={`People (${personResults.length})`}
                            subtitleKey="known_for_department"
                        />
                    )}
                </div>
            )}

            {/* Empty state */}
            {!query && !loading && (
                <div className="text-center text-gray-500 py-16">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-lg">Search for movies, TV shows, or people</p>
                </div>
            )}
        </div>
    );
};

export default TextSearch;

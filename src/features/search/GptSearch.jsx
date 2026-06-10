import React, { useState } from 'react';
import { TMDB_OPTIONS, TMDB_BASE_URL } from '../../utils/constants';
import MovieList from '../../components/shared/MovieList';
import { SearchResultsShimmer } from '../../components/shared/Shimmer';
import { useAppContext } from '../../context/AppContext';

const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;

const GptSearch = () => {
    const { searchCache, setSearchCache } = useAppContext();
    const [query, setQuery] = useState(searchCache.aiQuery || '');
    const [searchedQuery, setSearchedQuery] = useState(searchCache.aiQuery || '');
    const [movieResults, setMovieResults] = useState(searchCache.aiMovieResults || []);
    const [showResults, setShowResults] = useState(searchCache.aiShowResults || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchMovieNamesFromGemini = async (userQuery) => {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': GEMINI_KEY,
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a movie and TV show recommendation engine. Given the user's description, suggest 5-7 movie titles and 3-5 TV show titles that best match. Return ONLY a JSON object with two keys: "movies" (array of movie title strings) and "shows" (array of TV show title strings). All titles in English. No explanations, no markdown, no code blocks — just the raw JSON object.\n\nUser query: "${userQuery}"`
                        }]
                    }]
                })
            }
        );

        if (!response.ok) {
            const status = response.status;
            if (status === 429) throw new Error('Rate limit reached. Please wait a moment and try again.');
            throw new Error('Gemini API request failed');
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        // Parse the JSON from the response (handle possible markdown wrapping)
        const cleaned = text.replace(/```json\n?|```\n?/g, '').trim();
        try {
            return JSON.parse(cleaned);
        } catch {
            throw new Error('Could not parse AI response. Please try rephrasing your query.');
        }
    };

    const searchTMDB = async (name, type = 'movie') => {
        const res = await fetch(
            `${TMDB_BASE_URL}/search/${type}?query=${encodeURIComponent(name)}&language=en-US&page=1`,
            TMDB_OPTIONS
        );
        const data = await res.json();
        return data.results?.[0] || null;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setMovieResults([]);
        setShowResults([]);

        try {
            // Step 1: Get recommendations from Gemini
            const { movies = [], shows = [] } = await fetchMovieNamesFromGemini(query.trim());

            // Step 2: Search TMDB for movies and shows in parallel
            const [movieTmdb, showTmdb] = await Promise.all([
                Promise.all(movies.map(name => searchTMDB(name, 'movie'))),
                Promise.all(shows.map(name => searchTMDB(name, 'tv'))),
            ]);

            const validMovies = movieTmdb.filter(r => r && r.poster_path).map(m => ({ ...m, media_type: 'movie' }));
            const validShows = showTmdb.filter(r => r && r.poster_path).map(s => ({ ...s, media_type: 'tv' }));

            setMovieResults(validMovies);
            setShowResults(validShows);
            setSearchedQuery(query);
            setSearchCache(prev => ({ ...prev, aiQuery: query, aiMovieResults: validMovies, aiShowResults: validShows }));
        } catch (err) {
            console.error(err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Search Input */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6 md:mb-8 px-2">
                <div className="relative flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Describe what you're in the mood for..."
                            className="w-full pl-4 md:pl-5 pr-10 py-3 md:py-4 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-base md:text-lg placeholder-gray-500 outline-none focus:border-purple-500 transition-colors"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery('');
                                    setMovieResults([]);
                                    setShowResults([]);
                                    setSearchCache(prev => ({ ...prev, aiQuery: '', aiMovieResults: [], aiShowResults: [] }));
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !query.trim()}
                        className="w-full sm:w-auto px-4 md:px-6 py-3 md:py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm md:text-base whitespace-nowrap"
                    >
                        {loading ? '✨ Thinking...' : '🤖 Search'}
                    </button>
                </div>
                <p className="text-zinc-500 text-xs md:text-sm mt-2 text-center">
                    Try: "90s romantic comedies", "dark sci-fi like Blade Runner", "feel-good Bollywood movies"
                </p>
            </form>

            {/* Error */}
            {error && (
                <p className="text-red-400 text-center mb-4">{error}</p>
            )}

            {/* Loading */}
            {loading && <SearchResultsShimmer />}

            {/* Results */}
            {!loading && movieResults.length > 0 && (
                <MovieList title={`Movies for "${searchedQuery}"`} movies={movieResults} />
            )}
            {!loading && showResults.length > 0 && (
                <MovieList title={`Shows for "${searchedQuery}"`} movies={showResults} />
            )}

            {/* Empty state */}
            {!loading && !error && movieResults.length === 0 && showResults.length === 0 && !query && (
                <div className="text-center text-zinc-500 mt-12">
                    <p className="text-4xl mb-3">🤖</p>
                    <p className="text-lg">Describe the kind of movies you want</p>
                    <p className="text-sm mt-1">Our AI will find the perfect matches</p>
                </div>
            )}
        </div>
    );
};

export default GptSearch;

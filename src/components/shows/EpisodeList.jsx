import React, { useEffect, useState, useRef } from 'react';
import { TMDB_OPTIONS, TMDB_BASE_URL } from '../../utils/constants';
import EpisodeCard from './EpisodeCard';
import { EpisodeListShimmer } from '../shared/Shimmer';

const EpisodeList = ({ showId, numberOfSeasons }) => {
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(15);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch(`${TMDB_BASE_URL}/tv/${showId}/season/${selectedSeason}?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => {
                setEpisodes(data.episodes || []);
                setVisibleCount(15);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setEpisodes([]);
                setLoading(false);
            });
    }, [showId, selectedSeason]);

    return (
        <div className="mt-8 md:mt-10">
            <div className="flex items-center justify-between mb-3 md:mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-white">Episodes</h2>

                {/* Custom Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 bg-zinc-900 text-white border border-zinc-700 rounded-md px-4 py-2 text-sm font-medium cursor-pointer hover:border-zinc-500 transition-colors"
                    >
                        Season {selectedSeason}
                        <svg
                            className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-44 max-h-60 overflow-y-auto bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-50 scrollbar-hide">
                            {[...Array(numberOfSeasons)].map((_, i) => (
                                <div
                                    key={i + 1}
                                    onClick={() => {
                                        setSelectedSeason(i + 1);
                                        setDropdownOpen(false);
                                    }}
                                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                                        selectedSeason === i + 1
                                            ? 'bg-zinc-700 text-white font-medium'
                                            : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                                    }`}
                                >
                                    Season {i + 1}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {loading ? (
                <EpisodeListShimmer />
            ) : episodes.length > 0 ? (
                <div>
                    {episodes.slice(0, visibleCount).map((episode) => (
                        <EpisodeCard key={episode.id} episode={episode} />
                    ))}
                    {visibleCount < episodes.length && (
                        <button
                            onClick={() => setVisibleCount(prev => prev + 15)}
                            className="mt-4 w-full py-3 text-sm font-medium text-white bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-700 transition-colors cursor-pointer"
                        >
                            Load More ({episodes.length - visibleCount} remaining)
                        </button>
                    )}
                </div>
            ) : (
                <p className="text-gray-500">No episodes found for this season.</p>
            )}
        </div>
    );
};

export default EpisodeList;

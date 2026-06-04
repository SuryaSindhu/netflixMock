import React, { useState } from 'react';
import TextSearch from '../features/search/TextSearch';
import GenreSearch from '../features/search/GenreSearch';
import { NETFLIX_BG } from '../utils/constants';

const SearchPage = () => {
    const [activeTab, setActiveTab] = useState('search');

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <img
                    src={NETFLIX_BG}
                    alt="background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/85"></div>
            </div>

            {/* Content */}
            <div className="pt-20 md:pt-28 pb-16 px-3 md:px-12">
                {/* Tabs */}
                <div className="flex justify-center mb-6 md:mb-8">
                    <div className="bg-zinc-900 rounded-lg p-1 flex gap-1">
                        <button
                            onClick={() => setActiveTab('search')}
                            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-md text-xs md:text-sm font-medium transition-all cursor-pointer ${
                                activeTab === 'search'
                                    ? 'bg-white text-black'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            🔍 Search
                        </button>
                        <button
                            onClick={() => setActiveTab('genre')}
                            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-md text-xs md:text-sm font-medium transition-all cursor-pointer ${
                                activeTab === 'genre'
                                    ? 'bg-white text-black'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            🎬 Genre Mix
                        </button>
                    </div>
                </div>

                {/* Active Tab Content */}
                {activeTab === 'search' ? <TextSearch /> : <GenreSearch />}
            </div>
        </div>
    );
};

export default SearchPage;

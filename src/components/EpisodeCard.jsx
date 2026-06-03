import React from 'react';

const IMG_CDN = "https://image.tmdb.org/t/p/w300";

const EpisodeCard = ({ episode }) => {
    const trimmedOverview = episode.overview && episode.overview.length > 150
        ? episode.overview.slice(0, 150) + '...'
        : episode.overview;

    return (
        <div className="flex gap-4 py-4 border-b border-zinc-800 hover:bg-zinc-900 rounded-md px-2 transition-colors">
            {/* Thumbnail */}
            <div className="flex-shrink-0 w-40">
                {episode.still_path ? (
                    <img
                        src={IMG_CDN + episode.still_path}
                        alt={episode.name}
                        className="w-full aspect-video object-cover rounded"
                    />
                ) : (
                    <div className="w-full aspect-video bg-zinc-800 rounded flex items-center justify-center">
                        <span className="text-gray-600 text-sm">No Image</span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium text-sm truncate">
                        {episode.episode_number}. {episode.name}
                    </h4>
                    {episode.runtime && (
                        <span className="text-gray-400 text-xs flex-shrink-0 ml-2">
                            {episode.runtime}m
                        </span>
                    )}
                </div>
                {episode.air_date && (
                    <p className="text-gray-500 text-xs mt-1">{episode.air_date}</p>
                )}
                {trimmedOverview && (
                    <p className="text-gray-400 text-xs mt-2 leading-relaxed">{trimmedOverview}</p>
                )}
            </div>
        </div>
    );
};

export default EpisodeCard;

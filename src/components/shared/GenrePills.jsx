import React from 'react';

const GenrePills = ({ genres, variant = 'desktop' }) => {
    if (!genres || genres.length === 0) return null;

    if (variant === 'mobile') {
        return (
            <div className="flex flex-wrap gap-2 mt-3">
                {genres.map((genre) => (
                    <span key={genre.id} className="text-xs text-white/80 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                        {genre.name}
                    </span>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {genres.map((genre) => (
                <span key={genre.id} className="text-sm text-white/90 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 font-medium">
                    {genre.name}
                </span>
            ))}
        </div>
    );
};

export default GenrePills;

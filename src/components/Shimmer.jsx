import React from 'react';

// Shimmer for the Browse page (hero + movie rows)
export const BrowseShimmer = () => {
    return (
        <div className="bg-black min-h-screen animate-pulse">
            {/* Hero shimmer */}
            <div className="h-screen bg-zinc-900" />

            {/* Movie rows shimmer */}
            <div className="px-12 -mt-52 relative z-20 space-y-8">
                {[1, 2, 3].map((row) => (
                    <div key={row}>
                        <div className="h-6 w-40 bg-zinc-800 rounded mb-4" />
                        <div className="flex gap-4 overflow-hidden">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="w-36 md:w-48 h-56 md:h-72 bg-zinc-800 rounded-md flex-shrink-0" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Shimmer for the PlayPage
export const PlayPageShimmer = () => {
    return (
        <div className="bg-black min-h-screen animate-pulse">
            {/* Video shimmer */}
            <div className="w-full max-w-5xl mx-auto pt-20">
                <div className="w-full aspect-video bg-zinc-900 rounded" />
            </div>

            {/* Details shimmer */}
            <div className="px-12 py-8">
                <div className="flex gap-8">
                    {/* Poster */}
                    <div className="w-64 h-96 bg-zinc-800 rounded-md flex-shrink-0" />

                    {/* Info */}
                    <div className="flex-1 space-y-4">
                        <div className="h-10 w-2/3 bg-zinc-800 rounded" />
                        <div className="h-5 w-1/3 bg-zinc-800 rounded" />
                        <div className="flex gap-4">
                            <div className="h-6 w-20 bg-zinc-800 rounded" />
                            <div className="h-6 w-16 bg-zinc-800 rounded" />
                            <div className="h-6 w-24 bg-zinc-800 rounded" />
                        </div>
                        <div className="flex gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-8 w-20 bg-zinc-800 rounded-full" />
                            ))}
                        </div>
                        <div className="space-y-2 pt-4">
                            <div className="h-4 w-full bg-zinc-800 rounded" />
                            <div className="h-4 w-full bg-zinc-800 rounded" />
                            <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                        </div>
                    </div>
                </div>

                {/* Cast shimmer */}
                <div className="mt-10">
                    <div className="h-7 w-24 bg-zinc-800 rounded mb-4" />
                    <div className="flex gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-32 flex flex-col items-center gap-2">
                                <div className="w-32 h-32 bg-zinc-800 rounded-full" />
                                <div className="h-4 w-20 bg-zinc-800 rounded" />
                                <div className="h-3 w-16 bg-zinc-800 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Shimmer for the ShowPage (includes episodes section)
export const ShowPageShimmer = () => {
    return (
        <div className="bg-black min-h-screen animate-pulse">
            {/* Video shimmer */}
            <div className="w-full max-w-5xl mx-auto pt-20">
                <div className="w-full aspect-video bg-zinc-900 rounded" />
            </div>

            {/* Details shimmer */}
            <div className="px-12 py-8">
                <div className="flex gap-8">
                    <div className="w-64 h-96 bg-zinc-800 rounded-md flex-shrink-0" />
                    <div className="flex-1 space-y-4">
                        <div className="h-10 w-2/3 bg-zinc-800 rounded" />
                        <div className="h-5 w-1/3 bg-zinc-800 rounded" />
                        <div className="flex gap-4">
                            <div className="h-6 w-20 bg-zinc-800 rounded" />
                            <div className="h-6 w-24 bg-zinc-800 rounded" />
                            <div className="h-6 w-20 bg-zinc-800 rounded" />
                        </div>
                        <div className="flex gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-8 w-20 bg-zinc-800 rounded-full" />
                            ))}
                        </div>
                        <div className="space-y-2 pt-4">
                            <div className="h-4 w-full bg-zinc-800 rounded" />
                            <div className="h-4 w-full bg-zinc-800 rounded" />
                            <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                        </div>
                    </div>
                </div>

                {/* Cast shimmer */}
                <div className="mt-10">
                    <div className="h-7 w-16 bg-zinc-800 rounded mb-4" />
                    <div className="flex gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-32 flex flex-col items-center gap-2">
                                <div className="w-32 h-32 bg-zinc-800 rounded-full" />
                                <div className="h-4 w-20 bg-zinc-800 rounded" />
                                <div className="h-3 w-16 bg-zinc-800 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Episodes shimmer */}
                <div className="mt-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-7 w-28 bg-zinc-800 rounded" />
                        <div className="h-9 w-32 bg-zinc-800 rounded" />
                    </div>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex gap-4 py-4 border-b border-zinc-800">
                            <div className="w-40 aspect-video bg-zinc-800 rounded flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-1/2 bg-zinc-800 rounded" />
                                <div className="h-3 w-1/4 bg-zinc-800 rounded" />
                                <div className="h-3 w-full bg-zinc-800 rounded" />
                                <div className="h-3 w-3/4 bg-zinc-800 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

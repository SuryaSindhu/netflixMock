import React from 'react';

// Shimmer for the Browse page (hero + movie rows)
export const BrowseShimmer = () => {
    return (
        <div className="bg-black min-h-screen animate-pulse">
            {/* Mobile hero shimmer - poster card */}
            <div className="md:hidden pt-14 pb-4 flex flex-col items-center bg-gradient-to-br from-[#1a0000] via-[#0d0d0d] to-[#0a0a1a]">
                <div className="w-[70%] max-w-[300px] aspect-[2/3] bg-zinc-800 rounded-xl" />
            </div>

            {/* Desktop hero shimmer */}
            <div className="hidden md:block h-screen bg-zinc-900" />

            {/* Movie rows shimmer */}
            <div className="px-3 md:px-12 mt-4 md:-mt-52 relative z-20 space-y-6 md:space-y-8">
                {[1, 2, 3].map((row) => (
                    <div key={row}>
                        <div className="h-5 md:h-6 w-32 md:w-40 bg-zinc-800 rounded mb-3 md:mb-4" />
                        <div className="flex gap-2 md:gap-4 overflow-hidden">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="w-28 md:w-48 h-44 md:h-72 bg-zinc-800 rounded-md flex-shrink-0" />
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
        <div className="bg-zinc-950 min-h-screen animate-pulse">
            {/* Mobile: backdrop shimmer */}
            <div className="md:hidden">
                <div className="w-full h-[50vh] bg-zinc-900" />
                <div className="px-4 py-6 space-y-4">
                    <div className="h-6 w-3/4 bg-zinc-800 rounded" />
                    <div className="flex gap-2">
                        <div className="h-5 w-14 bg-zinc-800 rounded" />
                        <div className="h-5 w-12 bg-zinc-800 rounded" />
                        <div className="h-5 w-16 bg-zinc-800 rounded" />
                    </div>
                    <div className="flex gap-1.5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-6 w-16 bg-zinc-800 rounded-full" />
                        ))}
                    </div>
                    <div className="space-y-2 pt-2">
                        <div className="h-3.5 w-full bg-zinc-800 rounded" />
                        <div className="h-3.5 w-full bg-zinc-800 rounded" />
                        <div className="h-3.5 w-2/3 bg-zinc-800 rounded" />
                    </div>
                    {/* Info cards */}
                    <div className="grid grid-cols-2 gap-3 pt-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-16 bg-zinc-800/50 rounded-xl" />
                        ))}
                    </div>
                    {/* Cast */}
                    <div className="flex gap-3 pt-4 overflow-hidden">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
                                <div className="w-20 h-20 bg-zinc-800 rounded-full" />
                                <div className="h-3 w-14 bg-zinc-800 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
                <div className="w-full h-[70vh] bg-zinc-900" />
                <div className="px-12 py-10">
                    <div className="max-w-3xl space-y-3">
                        <div className="h-4 w-full bg-zinc-800 rounded" />
                        <div className="h-4 w-full bg-zinc-800 rounded" />
                        <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-20 bg-zinc-800/50 rounded-xl" />
                        ))}
                    </div>
                    <div className="mt-10">
                        <div className="h-6 w-20 bg-zinc-800 rounded mb-4" />
                        <div className="flex gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
                                    <div className="w-32 h-32 bg-zinc-800 rounded-full" />
                                    <div className="h-4 w-20 bg-zinc-800 rounded" />
                                    <div className="h-3 w-16 bg-zinc-800 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Shimmer for the ShowPage (includes episodes section)
export const ShowPageShimmer = () => {
    return (
        <div className="bg-zinc-950 min-h-screen animate-pulse">
            {/* Mobile */}
            <div className="md:hidden">
                <div className="w-full h-[50vh] bg-zinc-900" />
                <div className="px-4 py-6 space-y-4">
                    <div className="h-6 w-3/4 bg-zinc-800 rounded" />
                    <div className="flex gap-2">
                        <div className="h-5 w-14 bg-zinc-800 rounded" />
                        <div className="h-5 w-16 bg-zinc-800 rounded" />
                        <div className="h-5 w-12 bg-zinc-800 rounded" />
                    </div>
                    <div className="flex gap-1.5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-6 w-16 bg-zinc-800 rounded-full" />
                        ))}
                    </div>
                    <div className="space-y-2 pt-2">
                        <div className="h-3.5 w-full bg-zinc-800 rounded" />
                        <div className="h-3.5 w-full bg-zinc-800 rounded" />
                        <div className="h-3.5 w-2/3 bg-zinc-800 rounded" />
                    </div>
                    {/* Info cards */}
                    <div className="grid grid-cols-2 gap-3 pt-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-16 bg-zinc-800/50 rounded-xl" />
                        ))}
                    </div>
                    {/* Cast */}
                    <div className="flex gap-3 pt-4 overflow-hidden">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
                                <div className="w-20 h-20 bg-zinc-800 rounded-full" />
                                <div className="h-3 w-14 bg-zinc-800 rounded" />
                            </div>
                        ))}
                    </div>
                    {/* Episodes */}
                    <div className="pt-6">
                        <div className="flex justify-between mb-3">
                            <div className="h-5 w-20 bg-zinc-800 rounded" />
                            <div className="h-7 w-24 bg-zinc-800 rounded" />
                        </div>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-3 py-3 border-b border-zinc-800/50">
                                <div className="w-24 aspect-video bg-zinc-800 rounded flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3.5 w-3/4 bg-zinc-800 rounded" />
                                    <div className="h-3 w-1/3 bg-zinc-800 rounded" />
                                    <div className="h-3 w-full bg-zinc-800 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
                <div className="w-full h-[70vh] bg-zinc-900" />
                <div className="px-12 py-10">
                    <div className="max-w-3xl space-y-3">
                        <div className="h-4 w-full bg-zinc-800 rounded" />
                        <div className="h-4 w-full bg-zinc-800 rounded" />
                        <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-20 bg-zinc-800/50 rounded-xl" />
                        ))}
                    </div>
                    <div className="mt-10">
                        <div className="h-6 w-20 bg-zinc-800 rounded mb-4" />
                        <div className="flex gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
                                    <div className="w-32 h-32 bg-zinc-800 rounded-full" />
                                    <div className="h-4 w-20 bg-zinc-800 rounded" />
                                    <div className="h-3 w-16 bg-zinc-800 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Episodes */}
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
        </div>
    );
};

// Shimmer for the PersonPage
export const PersonPageShimmer = () => {
    return (
        <div className="bg-black min-h-screen animate-pulse">
            {/* Mobile */}
            <div className="md:hidden pt-20 pb-10 px-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-44 h-56 bg-zinc-800 rounded-lg" />
                    <div className="h-6 w-48 bg-zinc-800 rounded" />
                    <div className="flex gap-2">
                        <div className="h-6 w-16 bg-zinc-800 rounded-full" />
                        <div className="h-6 w-20 bg-zinc-800 rounded-full" />
                    </div>
                    <div className="w-full space-y-2 mt-4">
                        <div className="h-3.5 w-full bg-zinc-800 rounded" />
                        <div className="h-3.5 w-full bg-zinc-800 rounded" />
                        <div className="h-3.5 w-3/4 bg-zinc-800 rounded" />
                    </div>
                </div>
                {/* Filmography rows */}
                <div className="mt-8 space-y-6">
                    {[1, 2].map(row => (
                        <div key={row}>
                            <div className="h-5 w-32 bg-zinc-800 rounded mb-3" />
                            <div className="flex gap-2 overflow-hidden">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-28 h-44 bg-zinc-800 rounded-md flex-shrink-0" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:block pt-32 pb-16 px-12">
                <div className="flex gap-8">
                    <div className="w-64 h-80 bg-zinc-800 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-4">
                        <div className="h-10 w-64 bg-zinc-800 rounded" />
                        <div className="flex gap-3">
                            <div className="h-7 w-20 bg-zinc-800 rounded-full" />
                            <div className="h-7 w-24 bg-zinc-800 rounded-full" />
                            <div className="h-7 w-16 bg-zinc-800 rounded-full" />
                        </div>
                        <div className="space-y-2 pt-4">
                            <div className="h-4 w-full bg-zinc-800 rounded" />
                            <div className="h-4 w-full bg-zinc-800 rounded" />
                            <div className="h-4 w-full bg-zinc-800 rounded" />
                            <div className="h-4 w-2/3 bg-zinc-800 rounded" />
                        </div>
                    </div>
                </div>
                {/* Filmography rows */}
                <div className="mt-10 space-y-8">
                    {[1, 2].map(row => (
                        <div key={row}>
                            <div className="h-6 w-40 bg-zinc-800 rounded mb-4" />
                            <div className="flex gap-4 overflow-hidden">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="w-48 h-72 bg-zinc-800 rounded-md flex-shrink-0" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Shimmer for the SearchPage
export const SearchPageShimmer = () => {
    return (
        <div className="bg-black min-h-screen animate-pulse">
            {/* Mobile */}
            <div className="md:hidden pt-20 px-4 space-y-4">
                {/* Search bar */}
                <div className="h-11 w-full bg-zinc-800 rounded-lg" />
                {/* Result cards */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="aspect-[2/3] bg-zinc-800 rounded-md" />
                    ))}
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:block pt-28 px-12 space-y-6">
                {/* Search bar */}
                <div className="h-14 max-w-2xl mx-auto bg-zinc-800 rounded-lg" />
                {/* Result rows */}
                {[1, 2].map(row => (
                    <div key={row}>
                        <div className="h-6 w-36 bg-zinc-800 rounded mb-4" />
                        <div className="flex gap-4 overflow-hidden">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="w-48 h-72 bg-zinc-800 rounded-md flex-shrink-0" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

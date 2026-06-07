import React from 'react';

// ─── Tiny reusable building blocks (internal only) ───

const CardRow = ({ count = 8, mobile }) => (
    <div className={`flex ${mobile ? 'gap-2' : 'gap-4'} overflow-hidden`}>
        {[...Array(count)].map((_, i) => (
            <div key={i} className={`${mobile ? 'w-28 h-44' : 'w-48 h-72'} bg-zinc-800 rounded-md flex-shrink-0`} />
        ))}
    </div>
);

const CastRow = ({ count = 5, mobile }) => (
    <div className={`flex ${mobile ? 'gap-3' : 'gap-4'} overflow-hidden`}>
        {[...Array(count)].map((_, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className={`${mobile ? 'w-20 h-20' : 'w-32 h-32'} bg-zinc-800 rounded-full`} />
                <div className={`h-3 ${mobile ? 'w-14' : 'w-20'} bg-zinc-800 rounded`} />
                {!mobile && <div className="h-3 w-16 bg-zinc-800 rounded" />}
            </div>
        ))}
    </div>
);

const TextBlock = ({ lines = 3 }) => (
    <div className="space-y-2">
        {[...Array(lines)].map((_, i) => (
            <div key={i} className={`h-3.5 ${i === lines - 1 ? 'w-2/3' : 'w-full'} bg-zinc-800 rounded`} />
        ))}
    </div>
);

const InfoGrid = ({ count = 4, cols = 2 }) => (
    <div className={`grid grid-cols-${cols} gap-3`}>
        {[...Array(count)].map((_, i) => (
            <div key={i} className="h-16 bg-zinc-800/50 rounded-xl" />
        ))}
    </div>
);

const EpisodeRows = ({ count = 3, mobile }) => (
    <div className="space-y-0">
        {[...Array(count)].map((_, i) => (
            <div key={i} className={`flex ${mobile ? 'gap-3 py-3' : 'gap-4 py-4'} border-b border-zinc-800/50`}>
                <div className={`${mobile ? 'w-24' : 'w-40'} aspect-video bg-zinc-800 rounded flex-shrink-0`} />
                <div className="flex-1 space-y-2">
                    <div className={`h-4 ${mobile ? 'w-3/4' : 'w-1/2'} bg-zinc-800 rounded`} />
                    <div className="h-3 w-1/4 bg-zinc-800 rounded" />
                    <div className="h-3 w-full bg-zinc-800 rounded" />
                    {!mobile && <div className="h-3 w-3/4 bg-zinc-800 rounded" />}
                </div>
            </div>
        ))}
    </div>
);

const TitleRow = ({ mobile }) => (
    <div className={`${mobile ? 'h-5 w-32' : 'h-6 w-40'} bg-zinc-800 rounded ${mobile ? 'mb-3' : 'mb-4'}`} />
);

const HeroShimmer = () => (
    <>
        <div className="md:hidden"><div className="w-full h-[50vh] bg-zinc-900" /></div>
        <div className="hidden md:block"><div className="w-full h-[70vh] bg-zinc-900" /></div>
    </>
);

// ─── Page-level shimmers ───

export const MovieListShimmer = () => (
    <div className="px-3 md:px-6 py-4 md:py-8 animate-pulse">
        <div className="hidden md:block"><TitleRow /><CardRow /></div>
        <div className="md:hidden"><TitleRow mobile /><CardRow mobile /></div>
    </div>
);

export const EpisodeListShimmer = () => (
    <div className="animate-pulse">
        <EpisodeRows count={3} />
    </div>
);

export const SearchResultsShimmer = () => (
    <div className="animate-pulse space-y-6 px-2">
        <div className="hidden md:block space-y-6">
            <TitleRow />
            <CardRow />
            <TitleRow />
            <CardRow />
        </div>
        <div className="md:hidden space-y-6">
            <TitleRow mobile />
            <CardRow mobile count={6} />
            <TitleRow mobile />
            <CardRow mobile count={6} />
        </div>
    </div>
);

export const BrowseShimmer = () => (
    <div className="bg-black min-h-screen animate-pulse">
        {/* Mobile hero */}
        <div className="md:hidden pt-14 pb-4 flex flex-col items-center bg-gradient-to-br from-[#1a0000] via-[#0d0d0d] to-[#0a0a1a]">
            <div className="w-[70%] max-w-[300px] aspect-[2/3] bg-zinc-800 rounded-xl" />
        </div>
        {/* Desktop hero */}
        <div className="hidden md:block h-screen bg-zinc-900" />
        {/* Movie rows */}
        <div className="px-3 md:px-12 mt-4 md:-mt-52 relative z-20 space-y-6 md:space-y-8">
            {[1, 2, 3].map(row => (
                <div key={row}>
                    <div className="hidden md:block"><TitleRow /><CardRow /></div>
                    <div className="md:hidden"><TitleRow mobile /><CardRow mobile /></div>
                </div>
            ))}
        </div>
    </div>
);

export const MoviePageShimmer = () => (
    <div className="bg-zinc-950 min-h-screen animate-pulse">
        {/* Mobile */}
        <div className="md:hidden">
            <HeroShimmer />
            <div className="px-4 py-6 space-y-4">
                <div className="h-6 w-3/4 bg-zinc-800 rounded" />
                <div className="flex gap-2">
                    <div className="h-5 w-14 bg-zinc-800 rounded" />
                    <div className="h-5 w-12 bg-zinc-800 rounded" />
                    <div className="h-5 w-16 bg-zinc-800 rounded" />
                </div>
                <div className="flex gap-1.5">
                    {[1, 2, 3].map(i => <div key={i} className="h-6 w-16 bg-zinc-800 rounded-full" />)}
                </div>
                <TextBlock />
                <div className="pt-4"><InfoGrid /></div>
                <div className="pt-4"><CastRow mobile /></div>
            </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:block">
            <HeroShimmer />
            <div className="px-12 py-10">
                <TextBlock lines={3} />
                <div className="mt-8"><InfoGrid count={6} cols={4} /></div>
                <div className="mt-10">
                    <div className="h-6 w-20 bg-zinc-800 rounded mb-4" />
                    <CastRow count={8} />
                </div>
            </div>
        </div>
    </div>
);

export const ShowsPageShimmer = () => (
    <div className="bg-zinc-950 min-h-screen animate-pulse">
        {/* Mobile */}
        <div className="md:hidden">
            <HeroShimmer />
            <div className="px-4 py-6 space-y-4">
                <div className="h-6 w-3/4 bg-zinc-800 rounded" />
                <div className="flex gap-2">
                    <div className="h-5 w-14 bg-zinc-800 rounded" />
                    <div className="h-5 w-16 bg-zinc-800 rounded" />
                    <div className="h-5 w-12 bg-zinc-800 rounded" />
                </div>
                <div className="flex gap-1.5">
                    {[1, 2, 3].map(i => <div key={i} className="h-6 w-16 bg-zinc-800 rounded-full" />)}
                </div>
                <TextBlock />
                <div className="pt-4"><InfoGrid /></div>
                <div className="pt-4"><CastRow mobile /></div>
                <div className="pt-6">
                    <div className="flex justify-between mb-3">
                        <div className="h-5 w-20 bg-zinc-800 rounded" />
                        <div className="h-7 w-24 bg-zinc-800 rounded" />
                    </div>
                    <EpisodeRows count={3} mobile />
                </div>
            </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:block">
            <HeroShimmer />
            <div className="px-12 py-10">
                <TextBlock lines={3} />
                <div className="mt-8"><InfoGrid count={6} cols={4} /></div>
                <div className="mt-10">
                    <div className="h-6 w-20 bg-zinc-800 rounded mb-4" />
                    <CastRow count={8} />
                </div>
                <div className="mt-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-7 w-28 bg-zinc-800 rounded" />
                        <div className="h-9 w-32 bg-zinc-800 rounded" />
                    </div>
                    <EpisodeRows count={4} />
                </div>
            </div>
        </div>
    </div>
);

export const PersonPageShimmer = () => (
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
                <div className="w-full mt-4"><TextBlock /></div>
            </div>
            <div className="mt-8 space-y-6">
                {[1, 2].map(row => (
                    <div key={row}><TitleRow mobile /><CardRow mobile count={5} /></div>
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
                    <div className="pt-4"><TextBlock lines={4} /></div>
                </div>
            </div>
            <div className="mt-10 space-y-8">
                {[1, 2].map(row => (
                    <div key={row}><TitleRow /><CardRow /></div>
                ))}
            </div>
        </div>
    </div>
);

export const SearchPageShimmer = () => (
    <div className="bg-black min-h-screen animate-pulse">
        {/* Mobile */}
        <div className="md:hidden pt-20 px-4 space-y-4">
            <div className="h-11 w-full bg-zinc-800 rounded-lg" />
            <div className="grid grid-cols-3 gap-2 mt-4">
                {[...Array(9)].map((_, i) => <div key={i} className="aspect-[2/3] bg-zinc-800 rounded-md" />)}
            </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:block pt-28 px-12 space-y-6">
            <div className="h-14 max-w-2xl mx-auto bg-zinc-800 rounded-lg" />
            {[1, 2].map(row => (
                <div key={row}><TitleRow /><CardRow /></div>
            ))}
        </div>
    </div>
);

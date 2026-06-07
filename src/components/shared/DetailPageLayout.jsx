import React, { useEffect } from 'react';
import { IMG_CDN_W500 as IMG_CDN, getRatingStyle } from '../../utils/constants';
import TrailerPlayer from './TrailerPlayer';
import CastSection from './CastSection';
import WatchProviders from './WatchProviders';
import GenrePills from './GenrePills';
import RelatedLists from './RelatedLists';

const DetailPageLayout = ({
    id,
    item,
    title,
    date,
    metaItems,
    certification,
    quickFacts,
    cast,
    trailerId,
    providers,
    similar,
    recommendations,
    genreItems,
    genreLabel,
    children,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const { text: ratingColor, bg: ratingBg } = getRatingStyle(item.vote_average);

    return (
        <div className="bg-zinc-950 min-h-screen">
            {/* === DESKTOP LAYOUT === */}
            <div className="hidden md:block pt-20">
                {/* Trailer section */}
                <TrailerPlayer trailerId={trailerId} backdropPath={item.backdrop_path} posterPath={item.poster_path} title={title} />

                {/* Info section below trailer */}
                <div className="relative px-12 -mt-28 z-10 text-white">
                    <div className="flex gap-8">
                        {/* Poster - overlaps trailer */}
                        {item.poster_path && (
                            <div className="flex-shrink-0">
                                <img
                                    src={IMG_CDN + item.poster_path}
                                    alt={title}
                                    className="w-60 rounded-xl shadow-2xl shadow-black/90 border border-white/10 ring-1 ring-black/50"
                                />
                            </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0 pt-28">
                            <h1 className="text-5xl font-bold leading-tight tracking-tight">
                                {title}
                            </h1>
                            {item.tagline && (
                                <p className="text-gray-400 italic mt-2 text-lg font-light">
                                    "{item.tagline}"
                                </p>
                            )}

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-3 mt-5">
                                {item.vote_average > 0 && (
                                    <span className={`${ratingColor} ${ratingBg} border font-bold px-3 py-1.5 rounded-lg text-base`}>
                                        ★ {item.vote_average.toFixed(1)}<span className="text-[9px] font-normal opacity-70 ml-1">TMDB</span>
                                    </span>
                                )}
                                <span className="text-gray-300 text-base">{date?.split('-')[0]}</span>
                                {metaItems.filter(Boolean).map((meta, i) => (
                                    <span key={i} className="text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full">
                                        {meta}
                                    </span>
                                ))}
                                {certification && (
                                    <span className="border border-gray-500 px-2.5 py-1 text-xs text-gray-200 font-semibold rounded-md bg-white/5">
                                        {certification}
                                    </span>
                                )}
                            </div>

                            {/* Genres as pills */}
                            <GenrePills genres={item.genres} />

                            {/* Overview */}
                            <p className="text-gray-300 text-[15px] leading-relaxed mt-6 max-w-3xl">
                                {item.overview}
                            </p>

                            {/* Quick facts inline */}
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
                                {quickFacts.map(({ label, value }) => (
                                    <div key={label}>
                                        <span className="text-gray-500">{label}</span>{' '}
                                        <span className="text-gray-200 font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Watch Providers */}
                            <WatchProviders providers={providers} variant="desktop" />
                        </div>
                    </div>

                    {/* Cast Section */}
                    <CastSection cast={cast} variant="desktop" />

                    {/* Page-specific desktop content (e.g. EpisodeList) */}
                    {children?.desktop}

                    {/* Related Lists */}
                    <RelatedLists similar={similar} recommendations={recommendations} genreItems={genreItems} genreLabel={genreLabel} />
                </div>
            </div>

            {/* === MOBILE LAYOUT === */}
            <div className="md:hidden pt-16">
                {/* Mobile: Trailer */}
                <TrailerPlayer trailerId={trailerId} backdropPath={item.backdrop_path} posterPath={item.poster_path} title={title} variant="mobile" />

                {/* Mobile: Info Section */}
                <div className="px-4 pt-5 pb-4 text-white">
                    <h1 className="text-2xl font-bold leading-tight">
                        {title}
                    </h1>
                    {item.tagline && (
                        <p className="text-gray-400 italic text-sm mt-1">"{item.tagline}"</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-3 text-sm">
                        {item.vote_average > 0 && (
                            <span className={`${ratingColor} ${ratingBg} border font-bold px-2 py-0.5 rounded-md text-sm`}>
                                ★ {item.vote_average.toFixed(1)}<span className="text-[8px] font-normal opacity-70 ml-1">TMDB</span>
                            </span>
                        )}
                        <span className="text-gray-300">{date?.split('-')[0]}</span>
                        {metaItems.filter(Boolean).map((meta, i) => (
                            <span key={i} className="text-gray-300">{meta}</span>
                        ))}
                        {certification && (
                            <span className="border border-gray-400/50 px-2 py-0.5 text-xs text-gray-200 font-semibold rounded">
                                {certification}
                            </span>
                        )}
                    </div>
                    <GenrePills genres={item.genres} variant="mobile" />
                    {/* Overview */}
                    <p className="text-gray-300 text-sm leading-relaxed mt-4">
                        {item.overview}
                    </p>
                </div>
            </div>

            {/* Mobile Content Section */}
            <div className="md:hidden px-4 py-4 text-white">

                {/* Info Cards Row */}
                <div className="grid grid-cols-2 gap-3">
                    {quickFacts.map(({ label, value }) => (
                        <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                            <p className="text-gray-200 text-xs font-medium">{value}</p>
                        </div>
                    ))}
                </div>

                {/* Watch Providers */}
                <WatchProviders providers={providers} variant="mobile" />

                {/* Cast Section */}
                <CastSection cast={cast} variant="mobile" />

                {/* Page-specific mobile content (e.g. EpisodeList) */}
                {children?.mobile}

                {/* Related Lists */}
                <RelatedLists similar={similar} recommendations={recommendations} genreItems={genreItems} genreLabel={genreLabel} />
            </div>
        </div>
    );
};

export default DetailPageLayout;

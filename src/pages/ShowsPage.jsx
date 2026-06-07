import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { IMG_CDN_W500 as IMG_CDN, getRatingStyle } from '../utils/constants';
import { ShowsPageShimmer } from '../components/shared/Shimmer';
import EpisodeList from '../components/EpisodeList';
import TrailerPlayer from '../components/shared/TrailerPlayer';
import CastSection from '../components/shared/CastSection';
import WatchProviders from '../components/shared/WatchProviders';
import GenrePills from '../components/shared/GenrePills';
import RelatedLists from '../components/shared/RelatedLists';
import useShowDetails from '../hooks/useShowDetails';

const ShowsPage = () => {
    const { showId } = useParams();
    const { show, cast, trailerId, similar, recommendations, genreShows, contentRating, providers } = useShowDetails(showId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [showId]);

    if (!show) return <ShowsPageShimmer />;

    const { text: ratingColor, bg: ratingBg } = getRatingStyle(show.vote_average);

    const quickFacts = [
        show.production_companies?.length > 0 && { label: 'Studio', value: show.production_companies.slice(0, 2).map(c => c.name).join(', ') },
        show.networks?.length > 0 && { label: 'Network', value: show.networks.map(n => n.name).join(', ') },
        show.spoken_languages?.length > 0 && { label: 'Language', value: show.spoken_languages.slice(0, 2).map(l => l.english_name).join(', ') },
        show.status && { label: 'Status', value: show.status },
        show.type && { label: 'Type', value: show.type },
    ].filter(Boolean);

    return (
        <div className="bg-zinc-950 min-h-screen">
            {/* === DESKTOP LAYOUT === */}
            <div className="hidden md:block pt-20">
                {/* Trailer section */}
                <TrailerPlayer trailerId={trailerId} backdropPath={show.backdrop_path} posterPath={show.poster_path} title={show.name} />

                {/* Info section below trailer */}
                <div className="relative px-12 -mt-28 z-10 text-white">
                    <div className="flex gap-8">
                        {/* Poster - overlaps trailer */}
                        {show.poster_path && (
                            <div className="flex-shrink-0">
                                <img
                                    src={IMG_CDN + show.poster_path}
                                    alt={show.name}
                                    className="w-60 rounded-xl shadow-2xl shadow-black/90 border border-white/10 ring-1 ring-black/50"
                                />
                            </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0 pt-28">
                            <h1 className="text-5xl font-bold leading-tight tracking-tight">
                                {show.name}
                            </h1>
                            {show.tagline && (
                                <p className="text-gray-400 italic mt-2 text-lg font-light">
                                    "{show.tagline}"
                                </p>
                            )}

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-3 mt-5">
                                {show.vote_average > 0 && (
                                    <span className={`${ratingColor} ${ratingBg} border font-bold px-3 py-1.5 rounded-lg text-base`}>
                                        ★ {show.vote_average.toFixed(1)}<span className="text-[9px] font-normal opacity-70 ml-1">TMDB</span>
                                    </span>
                                )}
                                <span className="text-gray-300 text-base">{show.first_air_date?.split('-')[0]}</span>
                                {show.number_of_seasons > 0 && (
                                    <span className="text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full">
                                        {show.number_of_seasons} Season{show.number_of_seasons > 1 ? 's' : ''}
                                    </span>
                                )}
                                {show.number_of_episodes > 0 && (
                                    <span className="text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full">
                                        {show.number_of_episodes} Episodes
                                    </span>
                                )}
                                {contentRating && (
                                    <span className="border border-gray-500 px-2.5 py-1 text-xs text-gray-200 font-semibold rounded-md bg-white/5">
                                        {contentRating}
                                    </span>
                                )}
                            </div>

                            {/* Genres as pills */}
                            <GenrePills genres={show.genres} />

                            {/* Overview */}
                            <p className="text-gray-300 text-[15px] leading-relaxed mt-6 max-w-3xl">
                                {show.overview}
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

                    {/* Episodes Section */}
                    {show.number_of_seasons > 0 && (
                        <EpisodeList showId={showId} numberOfSeasons={show.number_of_seasons} />
                    )}

                    {/* Show Lists */}
                    <RelatedLists similar={similar} recommendations={recommendations} genreItems={genreShows} genreLabel={show.genres?.map(g => g.name).join(' & ')} />
                </div>
            </div>

            {/* === MOBILE LAYOUT === */}
            <div className="md:hidden pt-16">
                {/* Mobile: Trailer */}
                <TrailerPlayer trailerId={trailerId} backdropPath={show.backdrop_path} posterPath={show.poster_path} title={show.name} variant="mobile" />

                {/* Mobile: Info Section */}
                <div className="px-4 pt-5 pb-4 text-white">
                    <h1 className="text-2xl font-bold leading-tight">
                        {show.name}
                    </h1>
                    {show.tagline && (
                        <p className="text-gray-400 italic text-sm mt-1">"{show.tagline}"</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-3 text-sm">
                        {show.vote_average > 0 && (
                            <span className={`${ratingColor} ${ratingBg} border font-bold px-2 py-0.5 rounded-md text-sm`}>
                                ★ {show.vote_average.toFixed(1)}<span className="text-[8px] font-normal opacity-70 ml-1">TMDB</span>
                            </span>
                        )}
                        <span className="text-gray-300">{show.first_air_date?.split('-')[0]}</span>
                        {show.number_of_seasons > 0 && (
                            <span className="text-gray-300">
                                {show.number_of_seasons} Season{show.number_of_seasons > 1 ? 's' : ''}
                            </span>
                        )}
                        {contentRating && (
                            <span className="border border-gray-400/50 px-2 py-0.5 text-xs text-gray-200 font-semibold rounded">
                                {contentRating}
                            </span>
                        )}
                    </div>
                    <GenrePills genres={show.genres} variant="mobile" />
                    {/* Overview */}
                    <p className="text-gray-300 text-sm leading-relaxed mt-4">
                        {show.overview}
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

                {/* Episodes Section */}
                {show.number_of_seasons > 0 && (
                    <EpisodeList showId={showId} numberOfSeasons={show.number_of_seasons} />
                )}

                {/* Show Lists */}
                <RelatedLists similar={similar} recommendations={recommendations} genreItems={genreShows} genreLabel={show.genres?.map(g => g.name).join(' & ')} />
            </div>
        </div>
    );
}

export default ShowsPage;

import React from 'react'
import { useParams } from 'react-router-dom';
import { ShowsPageShimmer } from '../components/shared/Shimmer';
import EpisodeList from '../components/shows/EpisodeList';
import DetailPageLayout from '../components/shared/DetailPageLayout';
import useShowDetails from '../hooks/useShowDetails';

const ShowsPage = () => {
    const { showId } = useParams();
    const { show, cast, trailerId, similar, recommendations, genreShows, contentRating, providers } = useShowDetails(showId);

    if (!show) return <ShowsPageShimmer />;

    const quickFacts = [
        show.production_companies?.length > 0 && { label: 'Studio', value: show.production_companies.slice(0, 2).map(c => c.name).join(', ') },
        show.networks?.length > 0 && { label: 'Network', value: show.networks.map(n => n.name).join(', ') },
        show.spoken_languages?.length > 0 && { label: 'Language', value: show.spoken_languages.slice(0, 2).map(l => l.english_name).join(', ') },
        show.status && { label: 'Status', value: show.status },
        show.type && { label: 'Type', value: show.type },
    ].filter(Boolean);

    const metaItems = [
        show.number_of_seasons > 0 && `${show.number_of_seasons} Season${show.number_of_seasons > 1 ? 's' : ''}`,
        show.number_of_episodes > 0 && `${show.number_of_episodes} Episodes`,
    ];

    const episodeSection = show.number_of_seasons > 0
        ? <EpisodeList showId={showId} numberOfSeasons={show.number_of_seasons} />
        : null;

    return (
        <DetailPageLayout
            id={showId}
            item={show}
            title={show.name}
            date={show.first_air_date}
            metaItems={metaItems}
            certification={contentRating}
            quickFacts={quickFacts}
            cast={cast}
            trailerId={trailerId}
            providers={providers}
            similar={similar}
            recommendations={recommendations}
            genreItems={genreShows}
            genreLabel={show.genres?.map(g => g.name).join(' & ')}
            children={{ desktop: episodeSection, mobile: episodeSection }}
        />
    );
}

export default ShowsPage;

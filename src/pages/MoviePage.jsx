import React from 'react'
import { useParams } from 'react-router-dom';
import { MoviePageShimmer } from '../components/shared/Shimmer';
import DetailPageLayout from '../components/shared/DetailPageLayout';
import useMovieDetails from '../hooks/useMovieDetails';

const MoviePage = () => {
    const { movieId } = useParams();
    const { movie, cast, trailerId, similar, recommendations, genreMovies, certification, providers } = useMovieDetails(movieId);

    if (!movie) return <MoviePageShimmer />;

    const quickFacts = [
        movie.production_companies?.length > 0 && { label: 'Studio', value: movie.production_companies.slice(0, 2).map(c => c.name).join(', ') },
        movie.spoken_languages?.length > 0 && { label: 'Language', value: movie.spoken_languages.slice(0, 2).map(l => l.english_name).join(', ') },
        movie.budget > 0 && { label: 'Budget', value: `$${(movie.budget / 1000000).toFixed(0)}M` },
        movie.revenue > 0 && { label: 'Revenue', value: `$${(movie.revenue / 1000000).toFixed(0)}M` },
        movie.vote_count > 0 && { label: 'Votes', value: movie.vote_count.toLocaleString() },
        movie.status && { label: 'Status', value: movie.status },
    ].filter(Boolean);

    const metaItems = [
        movie.runtime > 0 && `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`,
    ];

    return (
        <DetailPageLayout
            id={movieId}
            item={movie}
            title={movie.title}
            date={movie.release_date}
            metaItems={metaItems}
            certification={certification}
            quickFacts={quickFacts}
            cast={cast}
            trailerId={trailerId}
            providers={providers}
            similar={similar}
            recommendations={recommendations}
            genreItems={genreMovies}
            genreLabel={movie.genres?.map(g => g.name).join(' & ')}
        />
    );
}

export default MoviePage;

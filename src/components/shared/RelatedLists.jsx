import React from 'react';
import MovieList from './MovieList';

const RelatedLists = ({ similar, recommendations, genreItems, genreLabel }) => {
    if (!similar?.length && !recommendations?.length && !genreItems?.length) return null;

    return (
        <div className="mt-8 space-y-2">
            {similar.length > 0 && <MovieList title={`Similar`} movies={similar} />}
            {recommendations.length > 0 && <MovieList title="Recommendations" movies={recommendations} />}
            {genreItems.length > 0 && <MovieList title={`More in ${genreLabel}`} movies={genreItems} />}
        </div>
    );
};

export default RelatedLists;

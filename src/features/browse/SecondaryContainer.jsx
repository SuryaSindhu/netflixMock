import React from "react";
import MovieList from "../../components/shared/MovieList";
import useCategory from "../../hooks/useCategory";
import { useAppContext } from "../../context/AppContext";

const SecondaryContainer = ({ nowPlaying }) => {
    const popular = useCategory('popular');
    const topRated = useCategory('topRated');
    const upcoming = useCategory('upcoming');
    const trending = useCategory('trending');

    const { contentType } = useAppContext();

    const labels = contentType === 'movie'
        ? { now: 'Now Playing', popular: 'Popular', topRated: 'Top Rated', upcoming: 'Upcoming' }
        : { now: 'Airing Today', popular: 'Popular Shows', topRated: 'Top Rated Shows', upcoming: 'On The Air' };

    return (
        <div className="mt-0 md:-mt-52 relative z-20 bg-black md:bg-gradient-to-b md:from-transparent md:to-black">
            <MovieList title={labels.now} movies={nowPlaying} />
            <div className="bg-black">
                <MovieList title="Trending This Week" movies={trending} />
                <MovieList title={labels.popular} movies={popular} />
                <MovieList title={labels.topRated} movies={topRated} />
                <MovieList title={labels.upcoming} movies={upcoming} />
            </div>
        </div>
    );
};

export default SecondaryContainer;

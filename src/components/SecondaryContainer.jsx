import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import usePopular from "../hooks/usePopular";
import useTopRated from "../hooks/useTopRated";
import useUpcoming from "../hooks/useUpcoming";
import useTrending from "../hooks/useTrending";

const SecondaryContainer = () => {
    usePopular();
    useTopRated();
    useUpcoming();
    useTrending();

    const movies = useSelector((state) => state.movies);
    const contentType = useSelector((state) => state.user.contentType);

    const labels = contentType === 'movie'
        ? { now: 'Now Playing', popular: 'Popular', topRated: 'Top Rated', upcoming: 'Upcoming' }
        : { now: 'Airing Today', popular: 'Popular Shows', topRated: 'Top Rated Shows', upcoming: 'On The Air' };

    return (
        <div className="mt-0 md:-mt-52 relative z-20 bg-black md:bg-gradient-to-b md:from-transparent md:to-black">
            <MovieList title={labels.now} movies={movies.nowPlaying} />
            <div className="bg-black">
                <MovieList title="Trending This Week" movies={movies.trending} />
                <MovieList title={labels.popular} movies={movies.popular} />
                <MovieList title={labels.topRated} movies={movies.topRated} />
                <MovieList title={labels.upcoming} movies={movies.upcoming} />
            </div>
        </div>
    );
};

export default SecondaryContainer;

import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import usePopular from "../hooks/usePopular";
import useTopRated from "../hooks/useTopRated";
import useUpcoming from "../hooks/useUpcoming";

const SecondaryContainer = () => {
    usePopular();
    useTopRated();
    useUpcoming();

    const movies = useSelector((state) => state.movies);

    return (
        <div className="-mt-52 relative z-20 bg-gradient-to-b from-transparent to-black">
            <MovieList title="Now Playing" movies={movies.nowPlaying} />
            <div className="bg-black">
                <MovieList title="Popular" movies={movies.popular} />
                <MovieList title="Top Rated" movies={movies.topRated} />
                <MovieList title="Upcoming" movies={movies.upcoming} />
            </div>
        </div>
    );
};

export default SecondaryContainer;

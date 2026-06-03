import React from "react";
import VideoBG from "./VideoBG";
import VideoInfo from "./VideoInfo";
import { useSelector } from "react-redux";

const MainContainer = () => {
    const nowPlayingMovies = useSelector((state) => state.movies.nowPlaying);
    return (
        <div className="relative h-screen overflow-hidden">
            <VideoBG movieId={nowPlayingMovies[1]?.id} />
            <VideoInfo title={nowPlayingMovies[1]?.title} overview={nowPlayingMovies[1]?.overview} />
        </div>
    );
};

export default MainContainer;

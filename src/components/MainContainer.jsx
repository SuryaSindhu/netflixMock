import React from "react";
import VideoBG from "./VideoBG";
import VideoInfo from "./VideoInfo";
import { useSelector } from "react-redux";

const MainContainer = () => {
    const nowPlayingMovies = useSelector((state) => state.movies.nowPlaying);
    return (
        <div className="relative h-screen overflow-hidden">
            <VideoBG movieId={nowPlayingMovies[0]?.id} />
            <VideoInfo title={nowPlayingMovies[0]?.title} overview={nowPlayingMovies[0]?.overview} movieId={nowPlayingMovies[0]?.id} />
        </div>
    );
};

export default MainContainer;

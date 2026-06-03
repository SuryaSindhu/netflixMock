import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoInfo = ({ title, overview, movieId }) => {
    const navigate = useNavigate();
    const contentType = useSelector((state) => state.user.contentType);
    const path = (contentType === 'tv' ? '/shows/' : '/movies/') + movieId;

    const trimmedOverview = overview && overview.length > 300
        ? overview.slice(0, 300) + '...'
        : overview;

    return (
        <div className="w-full h-full px-4 md:px-12 absolute top-0 text-white bg-gradient-to-r from-black z-10 flex flex-col justify-end pb-[25%] md:pb-[20%]">
            <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
            <p className="mt-2 md:mt-4 mb-4 md:mb-6 text-sm md:text-lg w-full md:w-1/3 line-clamp-3 md:line-clamp-none">{trimmedOverview}</p>
            <div className="flex gap-2 md:gap-3">
                <button className="bg-white text-black px-4 md:px-8 py-1.5 md:py-2 text-sm md:text-lg rounded-md font-bold hover:bg-opacity-80" onClick={() => navigate(path)}>
                    ▶ Play
                </button>
                {movieId && (
                    <button
                        onClick={() => navigate(path)}
                        className="bg-gray-500 bg-opacity-70 text-white px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-lg rounded-md font-bold hover:bg-opacity-50"
                    >
                        ⓘ More Info
                    </button>
                )}
            </div>
        </div>
    );
};

export default VideoInfo;

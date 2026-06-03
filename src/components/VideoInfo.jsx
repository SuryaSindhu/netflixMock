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
        <div className="w-full h-full px-12 absolute top-0 text-white bg-gradient-to-r from-black z-10 flex flex-col justify-end pb-[20%]">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="mt-4 mb-6 text-lg w-1/3">{trimmedOverview}</p>
            <div className="flex gap-3">
                <button className="bg-white text-black px-8 py-2 text-lg rounded-md font-bold hover:bg-opacity-80" onClick={() => navigate(path)}>
                    ▶ Play
                </button>
                {movieId && (
                    <button
                        onClick={() => navigate(path)}
                        className="bg-gray-500 bg-opacity-70 text-white px-6 py-2 text-lg rounded-md font-bold hover:bg-opacity-50"
                    >
                        ⓘ More Info
                    </button>
                )}
            </div>
        </div>
    );
};

export default VideoInfo;

import React from "react";
import { useNavigate } from "react-router-dom";

const VideoInfo = ({ title, overview, movieId }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full pt-[15%] px-12 absolute top-0 text-white bg-gradient-to-r from-black z-10">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="py-4 text-lg w-1/3">{overview}</p>
            <div className="flex gap-3">
                <button className="bg-white text-black px-8 py-2 text-lg rounded-md font-bold hover:bg-opacity-80">
                    ▶ Play
                </button>
                {movieId && (
                    <button
                        onClick={() => navigate('/play/' + movieId)}
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

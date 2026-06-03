import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TMDB_OPTIONS } from "../utils/constants";

const MobileHero = ({ movie }) => {
    const navigate = useNavigate();
    const contentType = useSelector((state) => state.user.contentType);
    const path = (contentType === "tv" ? "/shows/" : "/movies/") + movie.id;
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const type = contentType === "tv" ? "tv" : "movie";
        fetch(
            `https://api.themoviedb.org/3/${type}/${movie.id}?language=en-US`,
            TMDB_OPTIONS
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.genres) setGenres(data.genres.slice(0, 3));
            })
            .catch(() => {});
    }, [movie.id, contentType]);

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
        : null;

    return (
        <div className="relative w-full pt-14 pb-4 flex flex-col items-center bg-gradient-to-br from-[#1a0000] via-[#0d0d0d] to-[#0a0a1a] overflow-hidden">
            {/* Top-left red accent */}
            <div className="absolute -top-10 -left-10 w-[50%] h-[40%] bg-red-700/10 rounded-full blur-[80px] pointer-events-none" />
            {/* Bottom-right blue accent */}
            <div className="absolute -bottom-10 -right-10 w-[40%] h-[35%] bg-indigo-800/8 rounded-full blur-[80px] pointer-events-none" />

            {/* Poster with overlay content */}
            {posterUrl && (
                <div className="relative w-[70%] max-w-[300px] rounded-xl overflow-hidden shadow-2xl shadow-red-900/20 border border-white/10">
                    <img
                        src={posterUrl}
                        alt={movie.title || movie.name}
                        className="w-full object-cover"
                    />
                    {/* Bottom overlay on poster */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 pb-3 pt-10">
                        {/* Genre tags */}
                        {genres.length > 0 && (
                            <p className="text-[11px] text-white/70 text-center mb-2.5">
                                {genres.map((g) => g.name).join(' · ')}
                            </p>
                        )}
                        {/* Buttons */}
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={() => navigate(path)}
                                className="bg-white text-black px-5 py-1.5 text-xs rounded font-bold hover:bg-opacity-80 transition"
                            >
                                ▶ Play
                            </button>
                            <button
                                onClick={() => navigate(path)}
                                className="bg-white/15 backdrop-blur-sm text-white px-4 py-1.5 text-xs rounded font-semibold border border-white/20 hover:bg-white/25 transition"
                            >
                                ⓘ Info
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileHero;

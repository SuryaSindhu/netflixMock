import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TMDB_OPTIONS } from '../utils/constants';

const IMG_CDN = "https://image.tmdb.org/t/p/w300";

const MoviePopup = ({ movie, position, onClose }) => {
    const [details, setDetails] = useState(null);
    const navigate = useNavigate();
    const contentType = useSelector((state) => state.user.contentType);

    useEffect(() => {
        const endpoint = contentType === 'movie'
            ? `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`
            : `https://api.themoviedb.org/3/tv/${movie.id}?language=en-US`;

        fetch(endpoint, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setDetails(data))
            .catch(err => console.error(err));
    }, [movie.id, contentType]);

    const title = movie.title || movie.name;
    const runtime = contentType === 'movie'
        ? details?.runtime
        : details?.episode_run_time?.[0] || details?.number_of_seasons;

    return (
        <div
            className="fixed z-50"
            style={{ left: position.x - 120, top: position.y - 150 }}
            onMouseLeave={onClose}
        >
            <div className="w-60 bg-zinc-900 rounded-md shadow-xl animate-popIn cursor-pointer"
                onClick={(e) => { e.stopPropagation(); navigate((contentType === 'tv' ? '/shows/' : '/movies/') + movie.id); }}
            >
            <img
                src={IMG_CDN + (movie.backdrop_path || movie.poster_path)}
                alt={title}
                className="w-full aspect-video object-cover rounded-t-md"
            />
            <div className="p-3">
                <h3 className="text-white font-bold text-xs">{title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="text-green-400 font-semibold">
                        {Math.round(movie.vote_average * 10)}% Match
                    </span>
                    {contentType === 'movie' && runtime ? (
                        <span className="text-gray-400">
                            {Math.floor(runtime / 60)}h {runtime % 60}m
                        </span>
                    ) : contentType === 'tv' && details?.number_of_seasons ? (
                        <span className="text-gray-400">
                            {details.number_of_seasons} Season{details.number_of_seasons > 1 ? 's' : ''}
                        </span>
                    ) : null}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                    {details?.genres?.slice(0, 3).map((genre) => (
                        <span key={genre.id} className="text-[10px] text-gray-300 border border-gray-600 rounded px-1 py-0.5">
                            {genre.name}
                        </span>
                    ))}
                </div>
                <p className="text-gray-400 text-[10px] mt-1 line-clamp-3">{movie.overview}</p>
            </div>
            </div>
        </div>
    );
}

export default MoviePopup;

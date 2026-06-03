import React, { useState, useRef, useEffect } from 'react'
import MoviePopup from './MoviePopup';

const IMG_CDN = "https://image.tmdb.org/t/p/w300";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isHovered) return;
    const handleScroll = () => setIsHovered(false);
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isHovered]);

  if (!movie.poster_path) return null;

  const getCardCenter = () => {
    if (!cardRef.current) return { x: 0, y: 0 };
    const rect = cardRef.current.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  };

  return (
    <div
      ref={cardRef}
      className="w-36 md:w-48 flex-shrink-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <img
            src={IMG_CDN + movie.poster_path}
            alt={movie.title}
            className="w-full rounded-md"
        />
        {isHovered && <MoviePopup movie={movie} position={getCardCenter()} onClose={() => setIsHovered(false)} />}
    </div>
  )
}

export default MovieCard

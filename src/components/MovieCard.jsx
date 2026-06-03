import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MoviePopup from './MoviePopup';

const IMG_CDN = "https://image.tmdb.org/t/p/w300";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const contentType = useSelector((state) => state.user.contentType);

  useEffect(() => {
    if (!isHovered) return;
    const handleScroll = (e) => {
      // Only close on vertical page scroll, not horizontal list scroll
      if (e.target === document || e.target === document.documentElement || e.target === window) {
        setIsHovered(false);
      }
    };
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
      className="w-28 md:w-48 flex-shrink-0 cursor-pointer"
      onMouseEnter={() => {
        if (window.innerWidth >= 768) setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        const isTV = movie.media_type === 'tv' || (!movie.media_type && contentType === 'tv');
        navigate((isTV ? '/shows/' : '/movies/') + movie.id);
      }}
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

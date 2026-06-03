import React, { useRef, useState } from 'react'
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="px-3 md:px-6 py-4 md:py-8 relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
        <h2 className="text-lg md:text-2xl font-bold text-white py-1 md:py-2">{title}</h2>
        <div className="overflow-x-auto scrollbar-hide" ref={scrollRef}>
            <div className="flex gap-4 w-max">
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>

        {showArrows && (
          <div className="hidden md:block">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-90 text-white text-5xl h-36 w-14 flex items-center justify-center rounded-r-md z-[60]"
              onClick={() => scroll('left')}
            >
              ‹
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-90 text-white text-5xl h-36 w-14 flex items-center justify-center rounded-l-md z-[60]"
              onClick={() => scroll('right')}
            >
              ›
            </button>
          </div>
        )}
    </div>
  )
}

export default MovieList

import React from 'react'
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 py-8">
        <h2 className="text-xl md:text-2xl font-bold text-white py-2">{title}</h2>
        <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 w-max">
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default MovieList

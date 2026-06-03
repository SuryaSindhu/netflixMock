import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TMDB_OPTIONS } from '../utils/constants';
import { PersonPageShimmer } from './Shimmer';
import MovieList from './MovieList';

const IMG_CDN = "https://image.tmdb.org/t/p/w500";

const PersonPage = () => {
    const { personId } = useParams();
    const [person, setPerson] = useState(null);
    const [movieCredits, setMovieCredits] = useState([]);
    const [tvCredits, setTvCredits] = useState([]);
    const [bioExpanded, setBioExpanded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [personId]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${personId}?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setPerson(data))
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/person/${personId}/combined_credits?language=en-US`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => {
                const movies = (data.cast || [])
                    .filter(c => c.media_type === 'movie' && c.poster_path)
                    .sort((a, b) => b.popularity - a.popularity);
                const tv = (data.cast || [])
                    .filter(c => c.media_type === 'tv' && c.poster_path)
                    .sort((a, b) => b.popularity - a.popularity);
                setMovieCredits(movies);
                setTvCredits(tv);
            })
            .catch(err => console.error(err));
    }, [personId]);

    if (!person) return <PersonPageShimmer />;

    const age = person.birthday
        ? Math.floor((new Date() - new Date(person.birthday)) / 31557600000)
        : null;

    const bioIsLong = person.biography && person.biography.length > 400;
    const displayBio = bioIsLong && !bioExpanded
        ? person.biography.slice(0, 400) + '...'
        : person.biography;

    return (
        <div className="bg-black min-h-screen pt-24 md:pt-32 pb-16 px-4 md:px-12">
            {/* Person Info */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
                {/* Photo */}
                <div className="flex-shrink-0">
                    {person.profile_path ? (
                        <img
                            src={IMG_CDN + person.profile_path}
                            alt={person.name}
                            className="w-44 h-56 md:w-64 md:h-80 object-cover rounded-lg shadow-lg"
                        />
                    ) : (
                        <div className="w-44 h-56 md:w-64 md:h-80 bg-zinc-800 rounded-lg flex items-center justify-center text-gray-500 text-5xl">
                            👤
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex-1">
                    <h1 className="text-2xl md:text-4xl font-bold text-white text-center md:text-left">{person.name}</h1>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                        {person.known_for_department && (
                            <span className="bg-zinc-800 px-3 py-1 rounded-full">{person.known_for_department}</span>
                        )}
                        {person.birthday && (
                            <span className="bg-zinc-800 px-3 py-1 rounded-full">
                                Born: {person.birthday}{age !== null && ` (${age} yrs)`}
                            </span>
                        )}
                        {person.deathday && (
                            <span className="bg-zinc-800 px-3 py-1 rounded-full">Died: {person.deathday}</span>
                        )}
                        {person.place_of_birth && (
                            <span className="bg-zinc-800 px-3 py-1 rounded-full">{person.place_of_birth}</span>
                        )}
                    </div>

                    {/* Biography */}
                    {displayBio && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-white mb-2">Biography</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {displayBio}
                                {bioIsLong && (
                                    <button
                                        onClick={() => setBioExpanded(!bioExpanded)}
                                        className="ml-1 text-white hover:text-red-500 font-medium transition-colors"
                                    >
                                        {bioExpanded ? 'Show Less' : 'Read More'}
                                    </button>
                                )}
                            </p>
                        </div>
                    )}

                    {/* Quick Stats */}
                    <div className="flex gap-6 mt-6 text-sm">
                        {movieCredits.length > 0 && (
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{movieCredits.length}</p>
                                <p className="text-gray-400">Movies</p>
                            </div>
                        )}
                        {tvCredits.length > 0 && (
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{tvCredits.length}</p>
                                <p className="text-gray-400">TV Shows</p>
                            </div>
                        )}
                        {person.popularity && (
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{person.popularity.toFixed(0)}</p>
                                <p className="text-gray-400">Popularity</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Filmography */}
            <div className="mt-12">
                {movieCredits.length > 0 && (
                    <MovieList title="Known For (Movies)" movies={movieCredits} />
                )}
                {tvCredits.length > 0 && (
                    <MovieList title="Known For (TV Shows)" movies={tvCredits} />
                )}
            </div>
        </div>
    );
};

export default PersonPage;

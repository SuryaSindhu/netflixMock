import React, { useEffect, useState } from 'react'
import { TMDB_OPTIONS } from '../utils/constants';

const VideoBG = ({ movieId, contentType = 'movie', backdropPath }) => {
    const [trailerId, setTrailerId] = useState(null);
    const [noVideo, setNoVideo] = useState(false);

    useEffect(() => {
        setTrailerId(null);
        setNoVideo(false);

        if (movieId) {
            const type = contentType === 'tv' ? 'tv' : 'movie';
            fetch(`https://api.themoviedb.org/3/${type}/${movieId}/videos?language=en-US`, TMDB_OPTIONS)
                .then(res => res.json())
                .then(data => {
                    const video = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
                        || data.results.find(v => v.type === 'Teaser' && v.site === 'YouTube')
                        || data.results.find(v => v.type === 'Clip' && v.site === 'YouTube')
                        || data.results.find(v => v.site === 'YouTube');
                    if (video) {
                        setTrailerId(video.key);
                    } else {
                        setNoVideo(true);
                    }
                })
                .catch(err => {
                    console.error('Error fetching video:', err);
                    setNoVideo(true);
                });
        }
    }, [movieId, contentType]);

  return (
    <div className="w-full overflow-hidden">
        {trailerId ? (
            <iframe
                className="w-full aspect-video scale-[1.5] pointer-events-none"
                src={`https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&mute=1&loop=1&playlist=${trailerId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
                title="Background Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
            />
        ) : noVideo && backdropPath ? (
            <img
                src={`https://image.tmdb.org/t/p/original${backdropPath}`}
                alt="Backdrop"
                className="w-full aspect-video object-cover scale-[1.2]"
            />
        ) : null}
    </div>
  )
}

export default VideoBG

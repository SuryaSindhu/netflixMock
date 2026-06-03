import React, { useEffect, useState } from 'react'
import { TMDB_OPTIONS } from '../utils/constants';

const VideoBG = ({ movieId }) => {
    const [trailerId, setTrailerId] = useState(null);

    useEffect(() => {
        if (movieId) {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, TMDB_OPTIONS)
                .then(res => res.json())
                .then(data => {
                    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                    if (trailer) {
                        setTrailerId(trailer.key);
                    }
                })
                .catch(err => console.error('Error fetching video:', err));
        }
    }, [movieId]);

  return (
    <div className="w-full overflow-hidden">
        {trailerId && (
            <iframe
                className="w-full aspect-video scale-[1.5] pointer-events-none"
                src={`https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&mute=1&loop=1&playlist=${trailerId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
                title="Background Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
            />
        )}
    </div>
  )
}

export default VideoBG

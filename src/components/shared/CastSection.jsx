import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMG_CDN_W185 } from '../../utils/constants';

const config = {
    mobile: {
        wrapper: 'mt-8',
        heading: 'text-lg font-semibold text-white mb-4 uppercase tracking-wider',
        list: 'flex overflow-x-scroll gap-3 pb-4 scrollbar-hide',
        card: 'flex-shrink-0 w-24 text-center cursor-pointer group',
        img: 'w-24 h-24 object-cover rounded-full ring-2 ring-white/10 group-hover:ring-red-500 transition-all',
        placeholder: 'w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center text-gray-500 text-2xl ring-2 ring-white/10 group-hover:ring-red-500 transition-all',
    },
    desktop: {
        wrapper: 'mt-12',
        heading: 'text-lg font-semibold text-white mb-5 uppercase tracking-widest',
        list: 'flex overflow-x-scroll gap-4 pb-4 scrollbar-hide',
        card: 'flex-shrink-0 w-28 text-center cursor-pointer group',
        img: 'w-28 h-28 object-cover rounded-full ring-2 ring-white/10 group-hover:ring-red-500/70 transition-all duration-300',
        placeholder: 'w-28 h-28 rounded-full bg-zinc-800 flex items-center justify-center text-gray-500 text-3xl ring-2 ring-white/10 group-hover:ring-red-500/70 transition-all duration-300',
    },
};

const CastSection = ({ cast, variant = 'desktop', title = 'Cast', subtitleKey = 'character' }) => {
    const navigate = useNavigate();

    if (!cast || cast.length === 0) return null;

    const styles = config[variant];

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}>{title}</h2>
            <div className={styles.list}>
                {cast.slice(0, 20).map((actor) => (
                    <div
                        key={actor.id}
                        className={styles.card}
                        onClick={() => navigate(`/person/${actor.id}`)}
                    >
                        {actor.profile_path ? (
                            <img
                                src={`${IMG_CDN_W185}${actor.profile_path}`}
                                alt={actor.name}
                                className={styles.img}
                            />
                        ) : (
                            <div className={styles.placeholder}>👤</div>
                        )}
                        <p className="text-white text-xs mt-2 font-medium group-hover:text-red-400 transition-colors truncate">{actor.name}</p>
                        <p className="text-gray-500 text-[10px] truncate">{actor[subtitleKey]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CastSection;

import React from 'react';
import { IMG_CDN_W45 } from '../../utils/constants';

const config = {
    mobile: {
        heading: 'Available On',
        headingClass: 'text-sm text-gray-400 font-semibold mb-3 uppercase tracking-wider',
        pillClass: 'flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2',
        imgClass: 'w-7 h-7 rounded-md',
    },
    desktop: {
        heading: 'Where to Watch',
        headingClass: 'text-xs text-gray-500 font-semibold mb-2 uppercase tracking-widest',
        pillClass: 'group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors cursor-default',
        imgClass: 'w-5 h-5 rounded',
    },
};

const WatchProviders = ({ providers, variant = 'desktop' }) => {
    if (!providers) return null;

    const { heading, headingClass, pillClass, imgClass } = config[variant];

    const groups = [
        { items: providers.flatrate, label: null },
        { items: providers.rent, label: 'Rent' },
        { items: providers.buy, label: 'Buy' },
    ];

    return (
        <div className="mt-6">
            <h3 className={headingClass}>{heading}</h3>
            <div className="flex flex-wrap gap-2">
                {groups.map(({ items, label }) =>
                    items?.map(p => (
                        <div key={`${p.provider_id}-${label}`} className={pillClass}>
                            <img src={`${IMG_CDN_W45}${p.logo_path}`} alt={p.provider_name} className={imgClass} />
                            <span className="text-gray-200 text-xs">{p.provider_name}</span>
                            {label && <span className="text-gray-500 text-[10px]">{label}</span>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WatchProviders;

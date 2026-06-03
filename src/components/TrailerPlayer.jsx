import React, { useState, useRef } from 'react';

const TrailerPlayer = ({ trailerId, backdropPath, posterPath, title }) => {
    const [isMuted, setIsMuted] = useState(true);
    const iframeRef = useRef(null);
    const containerRef = useRef(null);

    const sendCommand = (func, args = []) => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func, args }),
                '*'
            );
        }
    };

    const toggleMute = () => {
        if (isMuted) {
            sendCommand('unMute');
            sendCommand('setVolume', [50]);
        } else {
            sendCommand('mute');
        }
        setIsMuted(!isMuted);
    };

    const toggleFullscreen = () => {
        if (containerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                containerRef.current.requestFullscreen();
            }
        }
    };

    if (trailerId) {
        return (
            <div ref={containerRef} className="w-full h-[55vh] relative overflow-hidden bg-black">
                <iframe
                    ref={iframeRef}
                    className="w-full h-full scale-[1.2] pointer-events-none"
                    src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&loop=1&playlist=${trailerId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&origin=${window.location.origin}`}
                    title={`${title} Trailer`}
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                />
                {/* Custom controls */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
                    <button
                        onClick={toggleMute}
                        className="bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/20 transition-all hover:scale-110"
                        title={isMuted ? 'Unmute' : 'Mute'}
                    >
                        {isMuted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/20 transition-all hover:scale-110"
                        title="Fullscreen"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                    </button>
                </div>
                {/* Subtle bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
            </div>
        );
    }

    if (backdropPath) {
        return (
            <div className="w-full h-[55vh] relative">
                <img
                    src={`https://image.tmdb.org/t/p/original${backdropPath}`}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />
            </div>
        );
    }

    if (posterPath) {
        return (
            <div className="w-full h-[55vh] relative bg-zinc-900 flex items-center justify-center">
                <img
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                    alt={title}
                    className="h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />
            </div>
        );
    }

    return null;
};

export default TrailerPlayer;

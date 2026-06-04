import React from "react";
import VideoBG from "./VideoBG";
import VideoInfo from "./VideoInfo";
import MobileHero from "./MobileHero";
import { useAppContext } from "../../context/AppContext";

const MainContainer = ({ nowPlaying }) => {
    const { contentType } = useAppContext();
    const firstItem = nowPlaying[0];

    if (!firstItem) return null;

    return (
        <>
            {/* Mobile hero — phones only */}
            <div className="block md:hidden">
                <MobileHero movie={firstItem} />
            </div>

            {/* Desktop/Tablet hero — video background + full info */}
            <div className="hidden md:block relative h-screen overflow-hidden">
                <VideoBG movieId={firstItem.id} contentType={contentType} backdropPath={firstItem.backdrop_path} />
                <VideoInfo
                    title={firstItem.title || firstItem.name}
                    overview={firstItem.overview}
                    movieId={firstItem.id}
                />
            </div>
        </>
    );
};

export default MainContainer;

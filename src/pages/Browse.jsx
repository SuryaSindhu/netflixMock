import React from 'react'
import useCategory from '../hooks/useCategory';
import MainContainer from '../features/browse/MainContainer';
import SecondaryContainer from '../features/browse/SecondaryContainer';
import { BrowseShimmer } from '../components/Shimmer';

const Browse = () => {
  const nowPlaying = useCategory('nowPlaying');

  if (!nowPlaying || nowPlaying.length === 0) return <BrowseShimmer />;

  return (
    <div className="bg-black">
        <MainContainer nowPlaying={nowPlaying} />
        <SecondaryContainer nowPlaying={nowPlaying} />
    </div>
  )
}

export default Browse

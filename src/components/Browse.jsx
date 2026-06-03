import React from 'react'
import { useSelector } from 'react-redux';
import useNowPlaying from '../hooks/useNowPlaying';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import { BrowseShimmer } from './Shimmer';

const Browse = () => {
  useNowPlaying();
  const nowPlaying = useSelector((state) => state.movies.nowPlaying);

  if (!nowPlaying || nowPlaying.length === 0) return <BrowseShimmer />;

  return (
    <div className="bg-black">
        <MainContainer />
        <SecondaryContainer />
    </div>
  )
}

export default Browse

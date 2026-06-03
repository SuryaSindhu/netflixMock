import React from 'react'
import useNowPlaying from '../hooks/useNowPlaying';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  useNowPlaying();

  return (
    <div className="bg-black">
        <MainContainer />
        <SecondaryContainer />
    </div>
  )
}

export default Browse

import React from 'react'
import { useEffect } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setNowPlaying } from '../utils/movieSlice';

const useNowPlaying = () => {
    const dispatch = useDispatch();
    useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', TMDB_OPTIONS)
        .then(res => res.json())
        .then(res => {
        console.log(res);
        // add to redux store
        dispatch(setNowPlaying(res.results));
        })
        .catch(err => console.error(err));
    }, []);
}

export default useNowPlaying

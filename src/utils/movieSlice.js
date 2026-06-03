import {createSlice} from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
        trending: [],
    },
    reducers: {
        setNowPlaying: (state, action) => {
            state.nowPlaying = action.payload;
        },
        setPopular: (state, action) => {
            state.popular = action.payload;
        },
        setTopRated: (state, action) => {
            state.topRated = action.payload;
        },
        setUpcoming: (state, action) => {
            state.upcoming = action.payload;
        },
        setTrending: (state, action) => {
            state.trending = action.payload;
        },
        clearAll: (state) => {
            state.nowPlaying = [];
            state.popular = [];
            state.topRated = [];
            state.upcoming = [];
            state.trending = [];
        },
    }
})

export const { setNowPlaying, setPopular, setTopRated, setUpcoming, setTrending, clearAll } = movieSlice.actions;
export default movieSlice.reducer;
import { combineReducers } from 'redux';
import filterSortReducer from './filterSortReducer';
import tabReducer from './tabReducer';
import searchReducer from './searchReducer';
import movieReducer from './movieReducer';
import expandReducer from './expandReducer';
import pageReducer from './pageReducer';
import currentMovieReducer from './currentMovieReducer'; 

export default combineReducers({
    filterSortReducer,
    tabReducer,
    searchReducer,
    movies: movieReducer,
    expandReducer,
    pageReducer, 
    currentMovie: currentMovieReducer
});
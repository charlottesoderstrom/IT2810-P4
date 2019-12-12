import {FETCH_MOVIE} from './types'; 
import {RESET_MOVIE} from './types'; 
import {CURRENT_MOVIE} from './types'; 

/* When there is an empty search, all movies will be fetched, 10 for each 
time this function is called. Gets page so the backend know which movies to give
   Checks if sort is checked as well*/
   export const fetchAllMovies = (page) => dispatch =>{
    
    fetch("http://it2810-04.idi.ntnu.no:3003/alpha/all&page="+page)
    .then(res => res.json())
    .then(resJSON => 
        dispatch({
            isLoading: true,
            type: FETCH_MOVIE,
            payload: resJSON,
        })
    );
};

/* Sets the current movie the user has clicked on, to get directed to a more detailed
page about the movie */

export const setCurrentMovie = (currMov) =>  {
  return{
    type: CURRENT_MOVIE,
    currMov
  }
}

/* Fetch movies only by the title, max 10. Gets page so the backend know which movies to give
Checks if sort is checked as well*/
export const fetchMoviesByTitle = (title, page, byDate) => dispatch =>{
  let sort;
  if(!byDate) {
      sort = "alpha"
  }
  else if(byDate) {
      sort = "date"
  }
  let search = title.replace(" ", "+")
  fetch("http://it2810-04.idi.ntnu.no:3003/"+sort+"/title="+search+"&page="+page)
  .then(res => res.json())
  .then(resJSON => 
      dispatch({
          isLoading: true,
          type: FETCH_MOVIE,
          payload: resJSON,
      })
  );
};

/* Fetches max 10 movies with no search input, but with filtered categories
Gets page so the backend know which movies to give
   Checks if sort is checked as well */
   export const fetchFilteredMovies = (page, genres, byDate) => dispatch =>{
    let sort;
    if(!byDate) {
        sort = "alpha"
    }
    else if(byDate) {
        sort = "date"
    }
    var genreList = ""
    for (var i = 0; i < genres.length; i++) {
        genreList += genres[i] + "+";
      }
    genreList = genreList.slice(0,-1)
    fetch("http://it2810-04.idi.ntnu.no:3003/"+sort+"/genres="+genreList+"&page=" + page)
    .then(res => res.json())
    .then(resJSON => 
        dispatch({
            isLoading: true,
            type: FETCH_MOVIE,
            payload: resJSON,
        })
    );
};

/* Fetch max. 10 movies with search input, filtered categories. 
Gets page so the backend know which movies to give
   Checks if sort is checked as well */
export const fetchFilteredTitleMovies = (page, title, genres, byDate) => dispatch =>{
    let sort;
    if(!byDate) {
        sort = "alpha"
    }
    else if(byDate) {
        sort = "date"
    }
    var genreList = ""
    for (var i = 0; i < genres.length; i++) {
        genreList += genres[i] + "+";
      }
    genreList = genreList.slice(0,-1)
    let search = title.replace(" ", "+")

    fetch("http://it2810-04.idi.ntnu.no:3003/f/"+sort+"/title="+search+"&genre="+genreList+"&page=" + page)
    .then(res => res.json())
    .then(resJSON => 
        dispatch({
            isLoading: true,
            type: FETCH_MOVIE,
            payload: resJSON,
        })
    );
};

/* Gets triggered when the user clicks on a category in the wordcloud
Fetches 10 movies in a given category*/
export const fetchOneCategory = (category, page) => dispatch =>{
    fetch("http://it2810-04.idi.ntnu.no:3003/alpha/genres="+category+"&page=" + page)
    .then(res => {
        return res.json()
    })
    .then(resJSON => {
        dispatch({
            isLoading: true,
            type: FETCH_MOVIE,
            payload: resJSON,
        })
    }
    );
};

/* Gets triggered when the user click on "Most popular tab"
Fetches 10 movies, sorted by number of votes, showing the highest
number of votes first*/
export const fetchMostPopular = (page) => dispatch =>{
    fetch("http://it2810-04.idi.ntnu.no:3003/vote/all&page=" + page)
    .then(res => {
        return res.json()
    })
    .then(resJSON => {
        dispatch({
            isLoading: true,
            type: FETCH_MOVIE,
            payload: resJSON,
        })
    }
    );
};

/* Resets the movie result saved in the store. Gets triggered when the user
changes tab or is done with a search, i.e clicked on the search button*/
export const handleReset = () =>{
    return {
        type: RESET_MOVIE
    }
};
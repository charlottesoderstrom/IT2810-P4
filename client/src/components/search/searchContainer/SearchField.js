import React from 'react';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, Text, View, Button } from 'react-native';
import { handleSearch } from '../../../actions/searchAction';
import {resetPage} from '../../../actions/pageAction';
import { fetchMoviesByTitle,
  fetchFilteredMovies, fetchFilteredTitleMovies, handleReset } from '../../../actions/movieAction'

function SearchField(props) {

  //Gets called when the user has written something in the search bar
  handleInput = (e) => {
    props.resetMovies();
    props.handleChangedInput(e);
    setTimeout(() => {
      checkSearch();
      }, 500);
  }

  /* Have to check the values of the the filtered categories and if sort by date is checked
  Sends the updated values to the respective methods to dispatch the different
  fetching methods*/
  checkSearch =() => {    
    let byDate = false
    let categories = []

    byDate = props.filterSort.byDate;
    for (var key in props.filterSort.categories) {
      if(props.filterSort.categories[key]) {
        categories.push(key)
      }
    }
    //handle only title search
    if(props.inputValue!== '' && categories.length===0){
        props.handleTitleSearch(props.inputValue,props.page, byDate)
    }
    //handle title + genre search
    else if(props.inputValue!== "" && categories.length>0) {
        props.handleFilterAndTitleSearch(props.page, props.inputValue,categories, byDate)
    }
    //handle only genre search
    else if(props.inputValue==='' && categories.length>0) {
        props.handleFilteredSearch(props.page, categories, byDate)
    }
    props.resetMovies()   
    props.handleResetPage()
}

  return (

    <View >
        <SearchBar style ={styles.searchBar} 
        placeholder="Type movietitle..."
        onChangeText={(e) => handleInput(e)}
        value={props.inputValue} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  searchBar: {
    width: '100%', 
  
  }
});

// Maps the global redux-state to props
const mapStateToProps = state => ({
  inputValue: state.searchReducer,
  page: state.pageReducer,
  filterSort: state.filterSortReducer
})

// Receives the dispatch() method and returns callback-props
const mapDispatchToProps = (dispatch) => ({
  handleChangedInput: (e) => {
      dispatch(handleSearch(e))
  },
  handleResetPage: () => dispatch(resetPage()),
  handleTitleSearch: (title, page, byDate) => dispatch(fetchMoviesByTitle(title, page, byDate)),
  handleFilteredSearch: (page, categories, byDate) => dispatch(fetchFilteredMovies(page, categories, byDate)),
  handleFilterAndTitleSearch: (page, title, categories, byDate) => dispatch(fetchFilteredTitleMovies(page, title, categories, byDate)),
  resetMovies: () => dispatch(handleReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);

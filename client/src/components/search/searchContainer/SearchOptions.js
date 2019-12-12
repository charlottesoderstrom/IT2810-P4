import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {filterChange} from '../../../actions/filterSortAction';
import {sortChange} from '../../../actions/filterSortAction';
import {resetPage} from '../../../actions/pageAction';
import { fetchMoviesByTitle, 
  fetchFilteredMovies, fetchFilteredTitleMovies, handleReset } from '../../../actions/movieAction'
  import { CheckBox } from 'react-native-elements'

/* Documentation for the CheckBox component: 
   https://facebook.github.io/react-native/docs/checkbox.html */
   
const categories1 = [
"Action",
"Adventure",
"Fantasy",
"Sci-Fi",
"Thriller",
"Animation",
"Comedy",
"Family"]

const categories2 = [
"Musical",
"Romance",
"Western",
"Drama",
"Horror",
"Crime",
"Music",
"Documentary"]


class SearchOptions extends Component {

  //Gets called when the user has clicked on a filterbox
  handleChangedFilter = (item) => {
    this.props.filterChanged(item);
    setTimeout(() => {
      this.checkSearch();
      }, 500);
  }
//Gets called when the user has clicked on the sortbox
  handleChangedSort = (item) => {
    this.props.sortChanged(item);
    setTimeout(() => {
      this.checkSearch();
      }, 500);
  }

  /* Have to check the values of the the filtered categories and if sort by date is checked
  Sends the updated values to the respective methods to dispatch the different
  fetching methods*/
  checkSearch =() => {
    let byDate = false
    let categories = []

    byDate = this.props.filterSort.byDate;
    for (var key in this.props.filterSort.categories) {
      if(this.props.filterSort.categories[key]) {
        categories.push(key)
      }
    }
    //handle only title search
    if(this.props.inputValue!== '' && categories.length===0){
      this.props.handleTitleSearch(this.props.inputValue,this.props.page, byDate)
    }
    //handle title + genre search
    else if(this.props.inputValue!== "" && categories.length>0) {
      this.props.handleFilterAndTitleSearch(this.props.page, this.props.inputValue,categories,
         byDate)
    }
    //handle only genre search
    else if(this.props.inputValue==='' && categories.length>0) {
      this.props.handleFilteredSearch(this.props.page, categories, byDate)
    }
    this.props.resetMovies()   
    this.props.handleResetPage()
}

  render() {
  return (
    <View style={styles.container}>
      <ScrollView >
      <Text style={styles.textStyle}>Filter:</Text>
      <View style = {styles.filterBoxContainer} id = "filterbox1">
      <View style={styles.filterBoxes} >
              {categories1.map(category =>
                <CheckBox 
                  key = {category}
                  title={category}
                  checked={this.props.filterSort.categories[category] || false}
                  onPress = {() => this.handleChangedFilter(category)}
              />
              )}       
      </View>

      <View style={styles.filterBoxes} id = "filterbox2">
              {categories2.map(category =>
                <CheckBox 
                  key = {category}
                  title={category}
                  checked={this.props.filterSort.categories[category] || false}
                  onPress = {() => this.handleChangedFilter(category)}
              />
              )}       
      </View>
      </View>

      <View style={styles.sortBox} >
      <Text style={styles.textStyle}>Sort:</Text>
              <CheckBox
                  title="By date"
                  center
                  checked={this.props.filterSort.byDate || false}
                  onPress = {() => this.handleChangedSort("By date")}
              />
      </View>
    </ScrollView>
    </View>
  );
}}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#02141D',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  filterBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  filterBoxes: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  textStyle: {
    textAlign:'center', 
    backgroundColor: '#02141D', 
    fontSize: 15, 
    fontWeight: 'bold',

    padding: 7, 
    color: 'white',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 3,
    },
    shadowOpacity: 0.46,
    shadowRadius: 5,
  }
});

// Maps the global redux-state to props
const mapStateToProps = state => ({
  filterSort: state.filterSortReducer,
  inputValue: state.searchReducer,
  page: state.pageReducer,
  
})

// Receives the dispatch() method and returns callback-props
const mapDispatchToProps = (dispatch) => ({
  filterChanged: (category, checked) => {
    dispatch(filterChange(category, checked))
  },
  sortChanged: (category, checked) => {
    dispatch(sortChange(category, checked))
  },
  handleResetPage: () => dispatch(resetPage()),
  handleTitleSearch: (title, page, byDate) => dispatch(fetchMoviesByTitle(title, page, byDate)),
  handleFilteredSearch: (page, categories, byDate) => dispatch(fetchFilteredMovies(page, categories, byDate)),
  handleFilterAndTitleSearch: (page, title, categories, byDate) => dispatch(fetchFilteredTitleMovies(page, title, categories, byDate)),
  resetMovies: () => dispatch(handleReset())
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchOptions);

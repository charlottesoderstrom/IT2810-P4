import React, {Component} from 'react';
import { connect } from 'react-redux';
import MovieResult from './MovieResult';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchAllMovies, fetchMostPopular , fetchMoviesByTitle, 
  fetchFilteredMovies, fetchFilteredTitleMovies} from '../../actions/movieAction'
import {handleLoadMore} from '../../actions/pageAction'
import Toast from 'react-native-root-toast';
let showed=false;

 /*
 Returns a random number between min (inclusive) and max (exclusive)
 */
let randomPage = Math.floor(Math.random() * (545 - 0) + 0);

class MovieResultContainer extends Component {

  componentDidMount(){
    if (this.props.tab ===1) {
      this.props.handleEmptySearch(randomPage);
    }
  }
  
// Calls mapDispatchToProps() to dispatch the function in the pageAction,
  //then calls handleLoadMore()
handlePageUpdate = () => {
  this.props.pageLoadMorelicked()
  setTimeout(()=> {
    this.handleLoadMore(), 500
  });
}

handleLoadMore = () => {
  //fetch 9 more random movies for the home screen
  if(this.props.tab===1) {
    
    let nextRandomPage = randomPage+1;
    randomPage = randomPage+1;
    if(this.randomPage>=544) {
      this.props.handleEmptySearch(this.randomPage-2) 
    }
    else{
      this.props.handleEmptySearch(nextRandomPage) 
    }
  }
  
  else if(this.props.tab===2) {
    //Checks the values of the filtered categories and sort in the store
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
        this.props.handleTitleSearch(this.props.inputValue,this.props.page, this.props.byDate)
        
    }
    //handle title + genre search, fetch 9 more movies
    else if(this.props.inputValue!== "" && categories.length>0) {
        this.props.handleFilterAndTitleSearch(this.props.page, this.props.inputValue,categories, this.props.byDate)
    }
    //handle only genre search, fetch 9 more movies
    else if(this.props.inputValue==='' && categories.length>0) {
        this.props.handleFilteredSearch(this.props.page, categories, this.props.byDate)
    }   
    }
    else if (this.props.tab===3) {
        //fetch the 9 next popular movies
        this.props.getNextPopular(this.props.page)
    }
}

// Return no result when the results equals 0
handleNoResult = () => {
  if (this.props.count!==''&&this.props.count[0].Results===0){
    return <Text style={{color:"white", textAlign:"center", fontSize:20}}>No results in database</Text>
  }else{
    return null
  }
}
     
render(){
    return (
      <View style={styles.containerrr}>
      <View>{this.props.isLoading===true && <View>
      <ActivityIndicator size="large" color="#00000"/>     
    </View> }</View>
    <View>{this.handleNoResult()}</View>
      <View style={styles.container}>
        {this.props.movies.map(movie => {
          return <MovieResult key={movie._id} movie={movie} />
        })}
        
      </View>
      <View>
            {this.props.count!=="" && (((this.props.page+1)*9) <= this.props.count[0].Results && 
            <TouchableOpacity style={styles.loadBtn} id = "load-more-btn" onPress= {() => this.handlePageUpdate()}><Text style={styles.btnText}>Load more</Text></TouchableOpacity>)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  loadBtn: {
    padding: 15,
    backgroundColor: '#34666B', 
    width: '100%',
    borderRadius: 5,
    marginRight: 0,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 3,
    },
    shadowOpacity: 0.46,
    shadowRadius: 5,
    borderRadius: 5

  },
  btnText: {
    color: 'white', 
    textAlign: 'center', 
    fontSize: 20
  }, 
  containerrr:{
    marginBottom: '22%' 
  }
  
});

// Maps the global redux-state to props
const mapStateToProps = state => ({
  page: state.pageReducer,
  movies: state.movies.result,
  count: state.movies.count,
  tab: state.tabReducer.currentTab,
  category: state.wordCloudReducer,
  filterSort: state.filterSortReducer,
  byDate: state.filterSortReducer.byDate,
  inputValue: state.searchReducer,
  isLoading: state.movies.isLoading
})

// Receives the dispatch() method and returns callback-props
const mapDispatchToProps = (dispatch) => ({
  pageLoadMorelicked: () => dispatch(handleLoadMore()),
  handleTitleSearch: (title, page, byDate) => dispatch(fetchMoviesByTitle(title, page+1, byDate)),
  handleEmptySearch: (randomPage) => dispatch(fetchAllMovies(randomPage+1)),
  handleFilteredSearch: (page, categories, byDate) => dispatch(fetchFilteredMovies(page+1, categories, byDate)),
  handleFilterAndTitleSearch: (page, title, categories, byDate) => dispatch(fetchFilteredTitleMovies(page+1, title, categories, byDate)),
  getNextPopular: (page) => dispatch(fetchMostPopular(page+1)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieResultContainer);

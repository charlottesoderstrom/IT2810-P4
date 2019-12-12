import React, {Component} from 'react';
import { connect } from 'react-redux';
import MovieResult from './MovieResult';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchAllMovies, fetchMostPopular , fetchMoviesByTitle, 
  fetchFilteredMovies, fetchFilteredTitleMovies} from '../../actions/movieAction'
import {handleLoadMore} from '../../actions/pageAction'

 /*
 Returns a random number between min (inclusive) and max (exclusive)
 */
let randomPage = Math.floor(Math.random() * (545 - 0) + 0);

class PopularMoviesContainer extends Component {

  
// Calls mapDispatchToProps() to dispatch the function in the pageAction,
  //then calls handleLoadMore()
handlePageUpdate = () => {
  this.props.pageLoadMorelicked()
  setTimeout(()=> {
    this.handleLoadMore(), 500
  });
}

//fetch the 9 next popular movies
handleLoadMore = () => {
  if (this.props.tab===3) {
        this.props.getNextPopular(this.props.page)
    }
}

render(){
    return (
      <View style={styles.containerrr}>
      <View>{this.props.isLoading===true && <View>
      <ActivityIndicator size="large" color="#00000"/>     
    </View> }</View>
    <View>{
            (this.props.count!=='' && this.props.count[0].Results===0 && 
            <Text id = "no-result-msg">No results in database</Text> )}</View>
      <View style={styles.container}>
        {this.props.movies.map(movie => {
          return <View style={styles.container} key={movie._id}>
            <MovieResult movie={movie} /> 
            <Text style={styles.popTxt1}>
                {movie.Title} 
            </Text>
            <Text style={styles.popTxt2}>
                Votes: {movie.Votes}  
            </Text>
        </View>
        })}
      </View>
      <View>
            {this.props.count!=="" && ((this.props.page+1)*10 <= this.props.count[0].Results && 
            <TouchableOpacity style={styles.loadBtn} id = "load-more-btn" onPress= {() => this.handlePageUpdate()}><Text style={styles.btnText}>Load more</Text></TouchableOpacity>)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
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
    marginBottom: '23%', 
    alignItems: 'center'
  },
  popTxt1: {
    color: 'white', 
    fontSize: 20, 
    textAlign: 'center',
    marginBottom: 5
  }, 
  popTxt2: {
    color: 'white', 
    fontSize: 15, 
    textAlign: 'center', 
    marginBottom: 10
  }
  
});

// Maps the global redux-state to props
const mapStateToProps = state => ({
  page: state.pageReducer,
  movies: state.movies.result,
  count: state.movies.count,
  tab: state.tabReducer.currentTab,
  inputValue: state.searchReducer,
  isLoading: state.movies.isLoading
})

// Receives the dispatch() method and returns callback-props
const mapDispatchToProps = (dispatch) => ({
  pageLoadMorelicked: () => dispatch(handleLoadMore()),
  getNextPopular: (page) => dispatch(fetchMostPopular(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PopularMoviesContainer);

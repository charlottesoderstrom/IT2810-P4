import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { setCurrentMovie } from '../../actions/movieAction'
import { handleTabChange } from '../../actions/tabAction';
import fallback from "../../img/fallback.png"
import {ImageLoader} from 'react-native-image-fallback';

const MovieResult = (props) => {
  const { movie } = props; 

  //Change screen to movie screen and set the selected movie in the redux state
  handleClick = (movie) => {
    props.handleCurrentMovieSet(movie) 
    props.changeTab(4) 
  }

  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={()=>handleClick(movie)}>
      <ImageLoader component={false} source={movie.Poster} fallback={fallback} style={styles.img} resizeMode="contain" />
        
        {/* <Image
          value = {movie._id}
          source={{uri: movie.Poster }}
          style={styles.img}
          //resizeMode='center'
          resizeMode='contain'
        /> */}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  img:{
    width: 120, 
    height: 200,
    //marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11,
  }
});

// Maps the global redux-state to props
const mapStateToProps = state => ({
  movies: state.movies, 
  currentMovie: state.currentMovie, 
  tab: state.tabReducer.currentTab 
})

// Receives the dispatch() method and returns callback-props
const mapDispatchToProps = (dispatch) => ({
  handleCurrentMovieSet: (currentMovie) => dispatch(setCurrentMovie(currentMovie)),
  changeTab: (tab) => {dispatch(handleTabChange(tab));}

})



export default connect(mapStateToProps, mapDispatchToProps)(MovieResult);

import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppHeader from '../components/header/AppHeader';
import {handleTabChange} from '../actions/tabAction';
import {handleReset, fetchMostPopular} from '../actions/movieAction';
import {resetPage} from '../actions/pageAction';
import {resetSearch} from '../actions/searchAction';
import { resetFilterSort } from '../actions/filterSortAction';
import { StyleSheet, Text, View, Image, ImageBackground, Platform,TouchableOpacity, ActivityIndicator, AsyncStorage, Button} from 'react-native';
import FooterMenu from '../components/menu/FooterMenu';
import {ImageLoader} from 'react-native-image-fallback';
//import Toast from 'react-native-simple-toast';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import fallback from "../img/fallback.png"
let color = "#02141d77";
let votes =0;

/* CSS link for help:
https://stackoverflow.com/questions/48590924/align-close-button-on-top-right-corner-of-imagebackground-react-native/48594875  
*/

const MovieScreen = (props) => {
  const { currentMovie } = props.currentMovie; 
    
  handleCloseMovie = () => {
    if(props.prevTab===1){
      props.changeToTab1(1);
    }
    else if(props.prevTab===2){
      props.changeToTab2(2);
    }
    else if(props.prevTab===3){
      props.changeToTab3(3, props.page);
    }
  }

  handleNotAvailable = (currentMovieData, field) =>{
    if (currentMovieData!=="N/A"){
      return <Text style={{color: 'white'}}>{field + currentMovieData}</Text>
    }
    return null
  }
  onError = () => {
    console.log("not found")
  }

      return (
        props.tab === 4 && 
        
        <ImageBackground source={{uri: currentMovie.Poster}} blurRadius={ Platform.OS == 'ios' ? 2 : 1 } style={{width: '100%', height: '100%'}} imageStyle={{backgroundColor:"grey"}} resizeMode="cover" >
        <View style={styles.container}>
        <AppHeader />
          <View style={styles.movieBody}>

          <TouchableOpacity style={styles.closeButtonStyle} onPress = {()=>handleCloseMovie()}>
            <Icon style={styles.iconStyle} name="times-circle" size={30} color="white"/>
          </TouchableOpacity>

          <Text style={{color: 'white', fontSize: 21, marginBottom: '-5%', fontWeight: 'bold'}}>{currentMovie.Title}</Text>
            <ImageLoader component={false} source={currentMovie.Poster} fallback={fallback} style={{width: "45%", height: "45%"}} resizeMode="contain" />
            <View style={styles.textContainer}>
              {handleNotAvailable(currentMovie.DateString, "Date: ")}
              {handleNotAvailable(currentMovie.Director, "Director: ")}
              {handleNotAvailable(currentMovie.Actors, "Actors: ")}
              {handleNotAvailable(currentMovie.Plot, "\n")}
              <View flexDirection="row" style={{alignSelf:"center", marginTop: '10%', marginBottom: '-10%'}}>
                <TouchableOpacity style={styles.buttonStyle} onPress = {()=>_storeVote(currentMovie,"down")}>
                    <Icon style={styles.iconsStyle} name="thumbs-down" size={40} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => _storeVote(currentMovie,"up")}>
                    <Icon style={styles.iconsStyle} name="thumbs-up" size={40} color="white"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <FooterMenu/>
        </View>
        </ImageBackground>
      ) 
    }


_storeVote = async(movieObject,up_or_down,func) =>{
  let id = movieObject._id.toString()
  AsyncStorage.getItem(id).then(result => {
    if (result!=="voted"){
      axios.post("http://it2810-04.idi.ntnu.no:3003/vote/id="+id+"&vote="+up_or_down).then(res => res.data)
      .then(feedback=> {
        if (feedback.Status==="OK"){
          AsyncStorage.setItem(id,"voted")
          console.log("You have "+up_or_down+"voted \""+feedback.Movie+"\"\nCurrentVotes: "+feedback.CurrentVotes)
          let textVote = up_or_down.replace(up_or_down[0], up_or_down[0].toUpperCase()) 
          Toast.show((textVote+"voted \n\""+feedback.Movie+"\"\n\nCurrentVotes: "+feedback.CurrentVotes), {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            backgroundColor: (up_or_down==="up"?"green":"red"),
            hideOnPress: true,
            delay: 0})
        }
      })
      .catch(err => Toast.show("Something went wrong\nTry again later!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        backgroundColor: "yellow",
        textColor:"black",
        hideOnPress: true,
        delay: 0}))
    }else{
      fetch("http://it2810-04.idi.ntnu.no:3003/id="+id).then(res => res.json()).then(res => 
      Toast.show("Already voted!\nCurrent votes: "+res.Votes, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        backgroundColor: "yellow",
        textColor:"black",
        hideOnPress: true,
        delay: 0})&& console.log(res._id))
      
      console.log(result)
    }
  })
  .catch(err => console.log(err))
}
_clearAsyncStorage = async() => {
  console.log("Clearing AsyncStorage")
  await AsyncStorage.clear();
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieBody: {
    flex: 1,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
    width: "80%",
    paddingHorizontal: "5%",
    marginBottom: '10%'
  },
  closeButtonStyle:{
    padding:3,
    alignSelf: 'flex-end', 
    marginTop: '-5%', 
    paddingBottom: '5%'
 
  },
  textContainer:{
    marginTop: '-10%', 
  },
  buttonStyle:{
    flex:1,
    alignItems: "center"
  }
});


const mapStateToProps = state => ({
  tab: state.tabReducer.currentTab,
  prevTab: state.tabReducer.prevTab,
  currentMovie: state.currentMovie,
  page: state.pageReducer
})

const mapDispatchToProps = (dispatch) => ({
  changeToTab1: (tab) => {
    dispatch(handleReset());
    dispatch(resetPage());
    dispatch(handleTabChange(tab));
  },
  changeToTab2: (tab) => {
    dispatch(handleReset());
    dispatch(resetPage());
    dispatch(resetSearch());
    dispatch(resetFilterSort());
    dispatch(handleTabChange(tab));
  },
  changeToTab3: (tab, page) => {
    dispatch(handleReset());
    dispatch(resetPage());
    dispatch(fetchMostPopular(page));
    dispatch(handleTabChange(tab));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieScreen);
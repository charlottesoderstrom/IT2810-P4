import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import FooterMenu from '../components/menu/FooterMenu';
import AppHeader from '../components/header/AppHeader';
import MovieResultContainer from '../components/movieResult/MovieResultContainer';



function HomeScreen(props) {
  
  return (
    props.tab ===1 && 
    <View style={styles.container}>
      <AppHeader/>
      <ScrollView>
        <View> 
          <MovieResultContainer/>
        </View>
      </ScrollView> 
      <FooterMenu/> 
    </View> 
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02141D', 
    zIndex: 5,
    
  },

});

const mapStateToProps = state => ({
  tab: state.tabReducer.currentTab,
  movies: state.movies
})

export default connect(mapStateToProps)(HomeScreen);

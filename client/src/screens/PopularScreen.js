import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import FooterMenu from '../components/menu/FooterMenu';
import AppHeader from '../components/header/AppHeader';
import MovieResultContainer from '../components/movieResult/MovieResultContainer';
import PopularMoviesContainer from '../components/movieResult/PopularMoviesContainer';

function PopularScreen(props) {
  return (
    props.tab === 3 && 
    <View style={styles.container}>
      <AppHeader/>
      <ScrollView>
      <Text style={styles.popText}>Most popular movies</Text>
        <View style={ styles.popContainer }>
        <PopularMoviesContainer />
        </View>
      </ScrollView>
      <FooterMenu/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262930', 
  },
    popText: {
      color: 'white', 
      textAlign: 'center', 
      fontSize: 30,
      padding: 10, 
      fontWeight: 'bold', 
      backgroundColor: '#02141D'

    }, 
    popContainer: {
      marginLeft: 10, 
    }

});

const mapStateToProps = state => ({
  tab: state.tabReducer.currentTab
})

export default connect(mapStateToProps)(PopularScreen);

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import SearchField from './SearchField';
import SearchOptions from './SearchOptions';
import MovieResultContainer from '../../movieResult/MovieResultContainer';
import {handleExpand} from '../../../actions/expandAction';

class SearchContainer extends Component {

  //To expand the advanced search box
  handleExpandClick = () => {
    this.props.expandedClick();
  }

  render() {
    return (
    <View style={styles.container}>
    <ScrollView>
        <SearchField/>
        <TouchableOpacity style={styles.advancedBtn} id = "expand-btn"  onPress = {() => this.handleExpandClick()}><Text style={styles.btnText}>Advanced Search</Text></TouchableOpacity>
        {this.props.isExpanded===true ? <SearchOptions style = {styles}/> : <Text></Text> }
        <MovieResultContainer style = {styles.movies}/>
    </ScrollView>
    </View> 
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  advancedBtn: {
    backgroundColor: '#34666B', 
    padding: 13,
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
    textAlign: 'center',
    fontSize: 20, 
    color: 'white',
  }
    
});

// Maps the global redux-state to props
const mapStateToProps = state => ({
  isExpanded: state.expandReducer,
})

// Receives the dispatch() method and returns callback-props
const mapDispatchToProps = (dispatch) => ({
  expandedClick: () => dispatch(handleExpand())
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);

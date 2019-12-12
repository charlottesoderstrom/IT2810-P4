import React from 'react';
import { connect } from 'react-redux';
import {handleTabChange} from '../../actions/tabAction';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import {fetchMostPopular, handleReset} from '../../actions/movieAction';
import {resetPage} from '../../actions/pageAction';
import {resetSearch} from '../../actions/searchAction';
import { resetFilterSort } from '../../actions/filterSortAction';

function FooterMenu(props) {

  //If the user is already on the tab it's clicking on in the menu, do nothing
  handleTab1Clicked = () => {
    if(props.tab===2 || props.tab===3 || props.tab===4) {
      props.changeToTab1(1)
    }
  }

  handleTab2Clicked = () => {
    if(props.tab===1 || props.tab===3 || props.tab===4) {
      props.changeToTab2(2)
    }
  }

  handleTab3Clicked = () => {
    if(props.tab===1 || props.tab===2 || props.tab===4) {
      props.changeToTab3(3)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress = {()=>handleTab1Clicked()}>
           <Icon style={styles.iconsStyle} name="home" size={40} color="white"/> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress = {()=>handleTab2Clicked()}>
           <Icon style={styles.iconsStyle} name="search" size={40} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress = {()=>handleTab3Clicked()}>
            <Icon style={styles.iconsStyle} name="list-ol" size={40} color="white"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    height: '10%',
    position: 'absolute', 
    zIndex: 1,
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: '#02141D',
    alignItems: 'center',
    justifyContent: 'center', 
    flexDirection: 'row', 
  },

  buttonContainer:{
    width:"100%",
    flexDirection: 'row'
  },
  buttonStyle:{
    backgroundColor:"#02141D",
    height:null,
    flex: 1,
  },
  iconsStyle:{
    textAlign:"center"
  }
});

// Maps the global redux-state to props
const mapStateToProps = state => ({
  tab: state.tabReducer.currentTab,
  prevTab: state.tabReducer.prevTab,
  page: state.pageReducer,
  filterSort: state.filterSortReducer,
  inputValue: state.searchReducer
})

// Receives the dispatch() method and returns callback-props
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
changeToTab3: (tab) => {
    dispatch(handleReset());
    dispatch(fetchMostPopular(0));
    dispatch(handleTabChange(tab));

}
})



export default connect(mapStateToProps, mapDispatchToProps)(FooterMenu);

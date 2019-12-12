import React from 'react';
import { StyleSheet, Text, View, Button, Image, } from 'react-native';



function AppHeader() {

  return (
    <View style={styles.container}>
      <Image 
        style={styles.headerImg}
        source={require( '../../../assets/mongoflix.png' )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#02141D',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative', 
    zIndex: 2,
    height: '11%',
    top: 0,
    left: 0, 
    right: 0, 
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 5,

    elevation: 24,
  },
  headerImg: {
    marginTop: '5%',
    width: 170,
    height: 40,

  }
});



export default AppHeader;

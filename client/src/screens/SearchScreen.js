import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FooterMenu from '../components/menu/FooterMenu';
import AppHeader from '../components/header/AppHeader';
import SearchContainer from '../components/search/searchContainer/SearchContainer';

function SearchScreen(props) {
  return (
    props.tab === 2 && 
    <View style={styles.container}>
      <AppHeader/>
      <ScrollView>
        <View>
          <SearchContainer/>
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
    width: '100%',
  },
});

const mapStateToProps = state => ({
  tab: state.tabReducer.currentTab
})

export default connect(mapStateToProps)(SearchScreen);

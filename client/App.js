import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store'
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import PopularScreen from './src/screens/PopularScreen';
import MovieScreen from './src/screens/MovieScreen';
import FooterMenu from './src/components/menu/FooterMenu';

function App() {
  return (
    <Provider store={store}> 
      <HomeScreen />
      <SearchScreen />
      <PopularScreen />
      <MovieScreen />
    </Provider>
  );
}


export default App;
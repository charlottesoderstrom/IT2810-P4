import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

// If you have a developer tool for redux on your browser,remove the commented out code
// inside compose
const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      
    )
  );

export default store;

import {TAB_CHANGED} from '../actions/types';

initialState={
    currentTab: 1,
    prevTab: 1
}

//Evaluates the type and updates the state accordingly
export default function(state = initialState, action) {
    switch(action.type) {
        case TAB_CHANGED:
            return {
                ...state,
                prevTab: state.currentTab,
                currentTab: action.tab
                
            }
        default:
            return state;
    }
}


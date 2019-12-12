import {EXPAND} from '../actions/types';

//Evaluates the type and updates the state accordingly
export default function(state = false, action) {
    switch(action.type) {
        case EXPAND:
            return !state;
        default:
            return state;
    }
}
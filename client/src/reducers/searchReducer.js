import {UPDATE_TEXT} from '../actions/types';
import {RESET_TEXT} from '../actions/types';

//Evaluates the type and updates the state accordingly
export default function(state = '', action) {
    switch(action.type) {
        case UPDATE_TEXT:
            return action.title
        case RESET_TEXT:
            return ''
        default:
            return state;
    }
}


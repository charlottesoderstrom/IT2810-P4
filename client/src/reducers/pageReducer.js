import {LOAD_MORE} from '../actions/types';
import {RESET_PAGE} from '../actions/types';

//Evaluates the type and updates the state accordingly
export default function(state = 0, action) {
    switch(action.type) {
        case LOAD_MORE:
            return state + 1
        case RESET_PAGE:
            return 0
        default:
            return state;
    }
}
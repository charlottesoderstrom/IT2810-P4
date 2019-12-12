import {FILTER_CHANGED} from '../actions/types';
import {SORT_CHANGED} from '../actions/types';
import {RESET_FILTERSORT} from '../actions/types';

const initialState = {
    byDate: false,
    categories: {},
}

//Evaluates the type and updates the state accordingly
export default function(state = initialState, action) {
    switch(action.type) {
        case FILTER_CHANGED:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.category]: !state.categories[action.category]
                }
            }
        case SORT_CHANGED:
                return {
                    ...state,
                    byDate: !state.byDate
                }
        case RESET_FILTERSORT:
        return {
               categories:{},
               byDate: false
            }
        default:
            return state;
    }
}

import {FETCH_MOVIE} from '../actions/types'; 
import {RESET_MOVIE} from '../actions/types'; 

const initialState = {
    result: [],
    count: '',
    
};

//Evaluates the type and updates the state accordingly
export default function(state=initialState, action){
    switch(action.type){
        case FETCH_MOVIE:
            return {
                isLoading: !action.isLoading,
                result: state.result.concat(action.payload.slice(0, -1)),
                count: action.payload.slice(-1) 
            };
        case RESET_MOVIE:        
            return {
                result: [],
                count: ''
            };
        default: 
        return state; 
    }
}

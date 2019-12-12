import {CURRENT_MOVIE} from '../actions/types'; 

const initialState = {
    currentMovie: {Title: 'ingen film'}
};

//Evaluates the type and updates the state accordingly
export default function(state=initialState, action){
    switch(action.type){
        case CURRENT_MOVIE: 
            return {
                currentMovie: action.currMov
            }; 
        default: 
            return state; 
    }
   
}

import {UPDATE_TEXT} from './types';
import {RESET_TEXT} from './types';

// When the user has written a search in the input field
export const handleSearch = (title) => {
    return {
        type: UPDATE_TEXT,
        title
    }
}

// When the user has switched tabs in the menu or is done with a search
export const resetSearch = () => {
    return {
        type: RESET_TEXT,
        
    }
}
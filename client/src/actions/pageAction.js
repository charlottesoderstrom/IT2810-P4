import {LOAD_MORE} from './types';
import {RESET_PAGE} from './types';

// When the user clicks on the "load more button"
export const handleLoadMore = () => {
    return {
        type: LOAD_MORE,
    }
}

// When the user changes tab in the menu
export const resetPage = () => {
    return {
        type: RESET_PAGE
    }
}
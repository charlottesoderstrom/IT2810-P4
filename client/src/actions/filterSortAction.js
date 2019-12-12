import {FILTER_CHANGED} from './types';
import {SORT_CHANGED} from './types';
import {RESET_FILTERSORT} from './types';


// Gets triggered when someone checked/unchecked a filter category or sort by date
export const filterChange = (category, checked) => {
    return {
        type: FILTER_CHANGED,
        category,
        checked,
    }
}

export const sortChange = (category, checked) => {
    return {
        type: SORT_CHANGED,
        category,
        checked,
    }
}

// Gets triggered when the user changed tab from the search page
export const resetFilterSort = () => {
    return {
        type: RESET_FILTERSORT
    }
}
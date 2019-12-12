import {TAB_CHANGED} from './types';

// When the user switches tab in the menu
export const handleTabChange = (tab) => {
    return {
        type: TAB_CHANGED,
        tab
    }
}

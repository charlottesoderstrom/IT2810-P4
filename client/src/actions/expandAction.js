import {EXPAND} from './types';

// Gets triggered when someone clicked on the expand-button for advanced search
export const handleExpand = () => {
    return {
        type: EXPAND
    }
}
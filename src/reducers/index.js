import { ERROR, ERROR_LIMIT_EXCEED, RESET_LIMIT_EXCEED} from '../constant';
import { combineReducers } from 'redux';
import photo from './photo';
import sidebar from './sidebar';
import dialog from './dialog';

function common(state = {}, action) {
    delete state.error;
    switch (action.type) {
        case ERROR:
            state.error = action.error;
            break;
        case ERROR_LIMIT_EXCEED:
            state.isLimitWarn = true;
            state.error = 'You exceed limit localStorage';
            break;
    }
    return {...state};
}

export default combineReducers({
    common,
    photo,
    sidebar,
    dialog
});
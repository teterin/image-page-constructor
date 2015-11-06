import { OPEN_DIALOG,CLOSE_DIALOG,SUBMIT_STICKER, DIALOG_CHANGE_TITLE,DIALOG_CHANGE_IMAGE, DIALOG_IMAGE_ERROR} from '../constant';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case DIALOG_CHANGE_TITLE:
            state.title = action.title;
            break;
        case DIALOG_CHANGE_IMAGE:
            state.image = action.image;
            delete state.imageError;
            break;
        case DIALOG_IMAGE_ERROR:
            state.imageError = action.error;
            delete state.image;
            break;
        case OPEN_DIALOG:
        case CLOSE_DIALOG:
        case SUBMIT_STICKER:
            return {};
    }
    return {...state};
}
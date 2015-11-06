import {CLOSE_DIALOG, DIALOG_CHANGE_TITLE, DIALOG_CHANGE_IMAGE, SUBMIT_STICKER, DIALOG_IMAGE_ERROR} from '../constant';
import {uploadImage} from '../helper';

export function closeDialog() {
    return {
        type: CLOSE_DIALOG
    }
}

export function changeTitle(title) {
    return {
        type: DIALOG_CHANGE_TITLE,
        title
    }
}

export function changeImage(inputEvent) {
    return dispatch=> {
        uploadImage(inputEvent)
            .then(image=>dispatch({
                type: DIALOG_CHANGE_IMAGE,
                image
            }))
            .catch(error=>dispatch({
                type: DIALOG_IMAGE_ERROR,
                error
            }));
    }
}

export function submitSticker() {
    return (dispatch, getState)=> {
        const state = getState().dialog;
        dispatch({
            type: SUBMIT_STICKER,
            title: state.title,
            image: state.image
        });
    }
}

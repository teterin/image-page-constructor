import {PHOTO_IMG_LOAD, PHOTO_START_OVER, ADD_STICKER, STICKER_CHANGE_SIZES, PHOTO_STICKER_DELETE, ERROR} from '../constant';
import {uploadImage} from '../helper';

export function onImgLoad(inputEvent) {
    return dispatch=> {
        uploadImage(inputEvent)
            .then(image=>dispatch({
                type: PHOTO_IMG_LOAD,
                image
            }))
            .catch(error=>dispatch({
                type: ERROR,
                error
            }));
    }
}

export function startOver() {
    return {
        type: PHOTO_START_OVER
    }
}

export function addSticker(x, y, stickerKey, addType) {
    return {
        type: ADD_STICKER,
        x, y, stickerKey, addType
    }
}

export function changeSizes(stickerKey, dx, dy) {
    return {
        type: STICKER_CHANGE_SIZES,
        stickerKey, dx, dy
    }
}
export function deleteSticker(stickerKey) {
    return {
        type: PHOTO_STICKER_DELETE,
        stickerKey
    }
}




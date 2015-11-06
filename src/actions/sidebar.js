import {OPEN_DIALOG, STICKER_DELETE} from '../constant';

export function openDialog() {
    return {
        type: OPEN_DIALOG
    }
}

export function deleteSticker(stickerKey) {
    return {
        type: STICKER_DELETE,
        stickerKey
    }
}


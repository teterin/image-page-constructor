import {OPEN_DIALOG, CLOSE_DIALOG,SUBMIT_STICKER, STICKER_DELETE} from '../constant';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case OPEN_DIALOG:
            state.isOpenDialog = true;
            break;
        case CLOSE_DIALOG:
            delete state.isOpenDialog;
            break;
        case SUBMIT_STICKER:
            let stickers = state.stickers || [];
            if (!state.counter) {
                state.counter = 0;
            }
            stickers.push({key: state.counter, title: action.title, image: action.image});
            state.stickers = stickers;
            state.counter++;
            delete state.isOpenDialog;
            break;
        case STICKER_DELETE:
            let obj = state.stickers.find(sticker=>sticker.key === action.stickerKey);
            state.stickers.splice(state.stickers.indexOf(obj), 1);
            break;
    }
    return {...state};
}
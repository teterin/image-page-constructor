import {PHOTO_IMG_LOAD, PHOTO_START_OVER, ADD_STICKER, STICKER_CHANGE_SIZES, PHOTO_STICKER_DELETE, STICKER_DELETE} from '../constant';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case PHOTO_IMG_LOAD:
            state.image = action.image;
            break;
        case PHOTO_START_OVER:
            return {};
        case ADD_STICKER:
            let stickers = state.stickers || [];
            switch (action.addType) {
                case 'new':
                    if (!state.counter) {
                        state.counter = 0;
                    }
                    stickers.push({
                        key: state.counter,
                        x: action.x,
                        y: action.y,
                        width: 150,
                        height: 150,
                        stickerKey: action.stickerKey
                    });
                    break;
                case 'update':
                    let sticker = stickers.find(sticker=>sticker.key === action.stickerKey);
                    sticker.x = action.x;
                    sticker.y = action.y;
                    break;
            }
            state.stickers = stickers;
            state.counter++;
            break;
        case STICKER_CHANGE_SIZES:
            let sticker = state.stickers.find(sticker=>sticker.key === action.stickerKey);
            sticker.width += action.dx;
            sticker.height += action.dy;
            break;
        case PHOTO_STICKER_DELETE:
            let item = state.stickers.find(sticker=>sticker.key === action.stickerKey);
            state.stickers.splice(state.stickers.indexOf(item), 1);
            break;
        case STICKER_DELETE:
            let items = state.stickers.filter(sticker=>sticker.stickerKey === action.stickerKey);
            items.forEach(item=> state.stickers.splice(state.stickers.indexOf(item), 1));

            break;
    }
    return {...state};
}
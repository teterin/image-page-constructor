import React from 'react';
import PhotoInput from './photo-input';
import PhotoWork from './photo-work';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/photo';

class PhotoArea extends React.Component {
    render() {
        const {state, sideBarStickers, onImgLoad, startOver, addSticker, changeSizes, deleteSticker} = this.props;
        if (!state.image) {
            return <PhotoInput onImgLoad={onImgLoad}/>;
        } else {
            let stickers = [];
            if (state.stickers) {
                stickers = state.stickers.map(sticker=> {
                    const sideBarSticker = sideBarStickers.find(item=>item.key === sticker.stickerKey);
                    return Object.assign({}, sticker, {
                        title: sideBarSticker.title,
                        image: sideBarSticker.image
                    })
                });
            }
            return <PhotoWork
                stickers={stickers}
                image={state.image} startOver={startOver}
                addSticker={addSticker}
                changeSizes={changeSizes}
                deleteSticker={deleteSticker}
                />;
        }
    }
}

export default connect(state => {
    return {
        state: state.photo,
        sideBarStickers: state.sidebar.stickers
    };
}, dispatch=>bindActionCreators(actions, dispatch))(PhotoArea);
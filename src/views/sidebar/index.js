import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/sidebar';
import CreateStickerDialog from '../create-sticker-dialog';
import Sticker from '../sticker';
import './style';

class Sidebar extends React.Component {
    render() {
        const {state, openDialog, deleteSticker } = this.props;
        return <div className="sidebar-container">
            {(()=> {
                if (state.isOpenDialog) {
                    return <CreateStickerDialog />;
                }
            })()}
            <div className="toolbar">
                <button onClick={openDialog}>Upload new sticker</button>
            </div>
            <div className="sticker-box">
                {(()=> {
                    if (state.stickers) {
                        return state.stickers.map(sticker=><Sticker key={sticker.key} sticker={sticker}
                                                                    deleteSticker={deleteSticker}/>);
                    }
                })()}
            </div>
        </div>;
    }
}

export default connect(state => {
    return {
        state: state.sidebar
    };
}, dispatch=>bindActionCreators(actions, dispatch))(Sidebar);
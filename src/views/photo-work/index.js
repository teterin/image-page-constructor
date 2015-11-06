import React from 'react';
import './style';
import StickerOnPhoto from '../sticker-on-photo';

export default class PhotoWork extends React.Component {

    drop(event) {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData('sticker'));
        const workplace = event.currentTarget;
        this.props.addSticker(
            event.clientX - workplace.offsetLeft + data.dx,
            event.clientY - workplace.offsetTop + data.dy,
            data.key,
            data.type
        );
    }

    render() {
        const {stickers, startOver, image, changeSizes, deleteSticker}=this.props;
        return <div className="photo-work-container">
            <div className="toolbar">
                <button onClick={startOver}>Start over</button>
            </div>
            <div className="workplace" onDrop={::this.drop} onDragOver={event=>event.preventDefault()}>
                <img src={image}/>
                {(()=> {
                    if (stickers) {
                        return stickers.map(sticker=><StickerOnPhoto key={sticker.key} sticker={sticker}
                                                                     changeSizes={changeSizes}
                                                                     deleteSticker={deleteSticker}
                            />);
                    }
                })()}
            </div>
        </div>;
    }
}

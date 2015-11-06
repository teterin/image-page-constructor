import React from 'react';
import './style';

export default class StickerOnPhoto extends React.Component {

    constructor() {
        super(...arguments);
        this.onResizerMouseDown = this.onResizerMouseDown.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    drag(event) {
        const obj = event.target;
        const photo = document.querySelector('.photo');
        const data = JSON.stringify(
            {
                dx: photo.offsetLeft + obj.offsetLeft - event.clientX,
                dy: photo.offsetTop + obj.offsetTop - event.clientY,
                key: this.props.sticker.key,
                type: 'update'
            });
        event.dataTransfer.setData('sticker', data);
    }

    onResize(event) {
        const {sticker, changeSizes} =this.props;
        const dx = event.clientX - this.resizeX;
        const dy = event.clientY - this.resizeY;
        this.resizeX = event.clientX;
        this.resizeY = event.clientY;
        changeSizes(sticker.key, dx, dy);
    }

    onResizerMouseDown(event) {
        this.resizeX = event.clientX;
        this.resizeY = event.clientY;
        const stopResize = ()=> {
            document.body.removeEventListener('mousemove', this.onResize);
            document.body.removeEventListener('mouseup', stopResize);
        };
        document.body.addEventListener('mousemove', this.onResize);
        document.body.addEventListener('mouseup', stopResize);
        event.preventDefault();
    }

    componentDidMount() {
        this.refs.resizer.addEventListener('mousedown', this.onResizerMouseDown);
    }

    componentWillUnmount() {
        this.refs.resizer.removeEventListener('mousedown', this.onResizerMouseDown);
    }

    render() {
        const {key, image, title, x, y, width, height} =this.props.sticker;
        const onDelete = ()=>this.props.deleteSticker(key);
        return <div className="sticker-on-photo" draggable="true"
                    onDragStart={::this.drag}
                    style={{left:x+'px',top:y+'px',width:width+'px',height:height+'px',backgroundImage:`url(${image})`}}>
            <span>{title}</span>

            <div className="resizer" ref="resizer">⇲</div>
            <div className="delete" onClick={onDelete}>X</div>
        </div>;
    }
}


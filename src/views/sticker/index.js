import React from 'react';
import './style';

export default class Sticker extends React.Component {

    drag(event) {
        const obj = event.target;
        const sidebar = document.querySelector('.sidebar');
        const data = JSON.stringify(
            {
                dx: sidebar.offsetLeft + obj.offsetLeft - event.clientX,
                dy: sidebar.offsetTop + obj.offsetTop - event.clientY,
                key: this.props.sticker.key,
                type: 'new'
            });
        event.dataTransfer.setData('sticker', data);
    }

    render() {
        const {key, image, title} =this.props.sticker;
        const onDelete = ()=>this.props.deleteSticker(key);
        return <div className="sticker-on-sidebar" draggable="true"
                    onDragStart={::this.drag} style={{backgroundImage:`url(${image})`}}>
            <span>{title}</span>

            <div className="delete" onClick={onDelete}>X</div>
        </div>;
    }
}


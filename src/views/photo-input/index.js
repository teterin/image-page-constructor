import React from 'react';
import './style';

export default class PhotoInput extends React.Component {
    render() {
        return <div className="photo-input-container">
            <input type="file" onChange={this.props.onImgLoad}/>
        </div>;
    }
}

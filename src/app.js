import React from 'react';
import PhotoArea from './views/photo-area';
import SideBar from './views/sidebar';
import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        return <div className="container">
            <div className="photo">
                <PhotoArea />
            </div>
            <div className="sidebar">
                <SideBar />
            </div>
        </div>;
    }

    componentDidUpdate() {
        const state = this.props.state;
        if (state && state.error) {
            alert(state.error);
        }
    }
}

export default connect(state => {
    return {state: state.common};
})(App);


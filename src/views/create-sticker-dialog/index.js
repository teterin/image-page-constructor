import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/dialog';
import './style';

class CreateStickerDialog extends React.Component {
    componentDidMount() {
        this.node = document.createElement('div');
        this.node.className = 'modal-dialog';
        document.body.appendChild(this.node);
        this.renderDialog();
    }

    render() {
        return null;
    }

    renderDialog() {
        const {state, closeDialog, changeTitle, changeImage, submitSticker} = this.props;
        ReactDOM.render(
            <div>
                <div className="overlay"></div>
                <div className="content">
                    <div>
                        <div >
                            <label>Title:</label>
                            <input type="text" value={state.title} maxLength="50" onChange={event=>changeTitle(event.target.value)}/>
                        </div>
                        <div className="file"><input type="file" onChange={changeImage}/></div>
                        {(()=> {
                            if (state.imageError) {
                                return <div className="image-error">{state.imageError}</div>;
                            }
                        })()}
                        <div className="buttons">
                            <button disabled={!state.title || !state.image} onClick={submitSticker}>Submit</button>
                            <button onClick={closeDialog}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            ,
            this.node);
    }

    componentWillReceiveProps() {
        this.renderDialog();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
    }
}

export default connect(state => {
    return {
        state: state.dialog
    };
}, dispatch=>bindActionCreators(actions, dispatch))(CreateStickerDialog);

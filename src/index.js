import { STORE_LIMIT, LOCAL_STORAGE_KEY, ERROR_LIMIT_EXCEED} from './constant';
import App from './app';
import reducers from './reducers';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import './style';

(()=> {
    const createStoreWithMiddleware = applyMiddleware(
        thunk
    )(createStore);

    let state;
    if (window.localStorage) {
        state = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (state) {
            state = JSON.parse(state);
        } else {
            state = undefined;
        }
    }
    const store = createStoreWithMiddleware(reducers, state);
    if (window.localStorage) {
        store.subscribe(()=> {
            const state = store.getState();
            const data = JSON.stringify(state);
            if (data.length * 2 > STORE_LIMIT) {
                if (!state.common.isLimitWarn) {
                    store.dispatch({type: ERROR_LIMIT_EXCEED});
                }
            } else {
                window.localStorage.setItem(LOCAL_STORAGE_KEY, data);
            }

        })
    }
    const el = document.getElementById('app');

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        el);

})()
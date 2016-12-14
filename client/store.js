import axios           from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {
    applyMiddleware,
    compose,
    createStore
}                    from 'redux';
import thunk         from 'redux-thunk';

import createReducers from './reducers';

const client = axios.create({
    baseURL: '/api',
    responseType: 'json'
});

export default function (initial) {
    let store = createStore(createReducers(), initial, compose(
        applyMiddleware(
            thunk,
            axiosMiddleware(client)
        ),
        process.env.NODE_ENV === 'development' && typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
            window.devToolsExtension() :
            f => f
    ));

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers').default);
        });
    }

    return store;
}

import {
    applyMiddleware,
    compose,
    createStore
}                    from 'redux';
import thunk         from 'redux-thunk';

import createReducers from './reducers';

export default function (initial) {
    let store = createStore(createReducers(), initial, compose(
        applyMiddleware(thunk),
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

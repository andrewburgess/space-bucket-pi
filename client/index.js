import { AppContainer } from 'react-hot-loader';
import { Provider }     from 'react-redux';
import React            from 'react';
import ReactDOM         from 'react-dom';

import Application  from './Application';
import createStore  from './store';
import socketClient from './socket';

const store = createStore({});
socketClient(store.dispatch);

const rootElement = document.getElementById('app');
ReactDOM.render(
    <AppContainer>
        <Provider store={ store }>
            <Application />
        </Provider>
    </AppContainer>,
    rootElement
);

if (module.hot) {
    module.hot.accept('./Application', () => {
        const NextApplication = require('./Application').default;
        ReactDOM.render(
            <AppContainer>
                <Provider store={ store }>
                    <NextApplication />
                </Provider>
            </AppContainer>,
            rootElement
        );
    });
}

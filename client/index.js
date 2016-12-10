import { AppContainer } from 'react-hot-loader';
import React            from 'react';
import ReactDOM         from 'react-dom';

import Application from './Application';

const rootElement = document.getElementById('app');
ReactDOM.render(
    <AppContainer>
        <Application />
    </AppContainer>,
    rootElement
);

if (module.hot) {
    module.hot.accept('./Application', () => {
        const NextApplication = require('./Application').default;
        ReactDOM.render(
            <AppContainer>
                <NextApplication />
            </AppContainer>,
            rootElement
        );
    });
}

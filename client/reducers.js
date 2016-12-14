import { combineReducers } from 'redux';

import app         from './ducks/app';
import environment from './ducks/environment';
import history     from './ducks/history';

export default function () {
    return combineReducers({
        app,
        environment,
        history
    });
}

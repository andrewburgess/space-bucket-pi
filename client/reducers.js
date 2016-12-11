import { combineReducers } from 'redux';

import app         from './ducks/app';
import environment from './ducks/environment';

export default function () {
    return combineReducers({
        app,
        environment
    });
}

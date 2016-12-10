import { combineReducers } from 'redux';

import app from './ducks/app';

export default function () {
    return combineReducers({
        app
    });
}

import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';
import {relateReducer} from 'relate-js';

import common from './common';
import administrators from './administrators';
import tasks from './tasks';
import versions from './versions';

export const reducersToCombine = {
    relateReducer,
    router,
    common,
    administrators,
    tasks,
    versions,
};
const rootReducer = combineReducers(reducersToCombine);

export default rootReducer;

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import jokesReducer from '../reducers';

export const store = createStore(jokesReducer, applyMiddleware(thunk, logger));

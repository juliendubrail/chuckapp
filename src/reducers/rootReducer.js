import { combineReducers } from 'redux';
import { joke, jokeHasErrored, jokeIsLoading } from './reducers';

export default combineReducers({
    joke,
    jokeHasErrored,
    jokeIsLoading
});
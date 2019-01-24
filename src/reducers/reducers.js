import { JOKE_HAS_ERRORED, JOKE_IS_LOADING, JOKE_FETCH_DATA_SUCCESS } from "../actions/actionTypes";

/* const initialState = {
    joke: [],
    loading: false,
    error: null
  } */

export function jokeHasErrored(state = false, action) {
    switch(action.type){
        case JOKE_HAS_ERRORED:
        return action.hasErrored;

        default: 
        return state;
    }
}

export function jokeIsLoading(state = false, action) {
    switch(action.type){
        case JOKE_IS_LOADING:
        return action.isLoading;

        default: 
        return state;
    }
}

export function joke(state = [], action){
    switch(action.type){
        case JOKE_FETCH_DATA_SUCCESS: 
        return action.joke;

        default:
        return state;

    }
}
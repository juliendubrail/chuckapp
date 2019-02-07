import {
  JOKE_HAS_ERRORED,
  JOKE_IS_LOADING,
  JOKE_FETCH_DATA_SUCCESS,
  LIKED_JOKE,
  DISLIKED_JOKE,
  REMOVE_JOKE,
} from '../actions/actionTypes';

export const jokeHasErrored = () => ({
  type: JOKE_HAS_ERRORED,
});

export const jokeIsLoading = () => ({
  type: JOKE_IS_LOADING,
});

export const jokeFetchDataSuccess = data => ({
  type: JOKE_FETCH_DATA_SUCCESS,
  data,
});

export const jokeIsLiked = id => ({
  type: LIKED_JOKE,
  payload: { id, liked: true },
});

export const jokeIsDisliked = id => ({
  type: DISLIKED_JOKE,
  payload: id,
});

export const jokeIsRemoved = id => ({
  type: REMOVE_JOKE,
  payload: id,
});

// TODO: refactor jokeFetchData pour utiliser async / await vs .then
export const jokeFetchData = url => {
  return dispatch => {
    dispatch(jokeIsLoading());
    fetch('http://api.icndb.com/jokes/random')
      .then(response => {
        if (!response.ok) {
          dispatch(jokeHasErrored());
        }
        return response;
      })
      .then(response => response.json())
      .then(joke => dispatch(jokeFetchDataSuccess(joke)))
      .catch(() => dispatch(jokeHasErrored()));
  };
};

export const categoryClicked = liked => {
  return dispatch => {
    if (liked) {
      dispatch(jokeIsLiked());
    } else {
      dispatch(jokeIsDisliked());
    }
  };
};

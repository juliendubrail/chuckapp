import { JOKE_HAS_ERRORED, JOKE_IS_LOADING, JOKE_FETCH_DATA_SUCCESS, LIKED_JOKE, DISLIKED_JOKE, REMOVE_JOKE } from '../actions/actionTypes';

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

export const jokeIsLiked = liked => ({
    type: LIKED_JOKE,
    liked
});

export const jokeIsDisliked = id => ({
    type: DISLIKED_JOKE,
    payload: id
});

export const jokeIsRemoved = id => ({
  type: REMOVE_JOKE,
  payload: id
})

export const jokeFetchData = url => {
  return dispatch => {
    dispatch(jokeIsLoading());
    // on dispatch le resultat d'appeler jokeIsLoading donc l'objet : { type: JOKE_IS_LOADING } qui sera passer en second
    // argument du reducer par store.dispatch ci-dessous (regarde l'ensemble de createStore dans notes.js):
    /*
        const dispatch = (action) => { <== ici l'action est { type: JOKE_IS_LOADING }
        state = reducer(state, action); <== l'action est passée, avec le state, au reducer qu'on a passé a la fonction createStore au moment ou on a appelé createStore (dans configureStore.js). C'est pour ca qu'on a acces au state et a l'action dans le reducer a chaque fois qu'on appel dispatch() 
        listeners.forEach(listener => listener());
        };
    */

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
if (liked) {
  return dispatch => {
    dispatch(jokeIsLiked())
  }
} else {
  return dispatch => {
    dispatch(jokeIsDisliked())
  }
}
}

export const remove = id  => {
  return dispatch => {
    dispatch(jokeIsRemoved(id))
  }
}

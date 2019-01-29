import { JOKE_HAS_ERRORED, JOKE_IS_LOADING, JOKE_FETCH_DATA_SUCCESS, LIKED_JOKE, DISLIKED_JOKE } from '../actions/actionTypes';

const initialState = {
  currentJoke: {},
  byId: {},
  likedJokesIds: [],
  dislikedJokesIds: [],
  error: false,
  loading: false,
};

const jokesReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOKE_HAS_ERRORED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case JOKE_IS_LOADING:
      // il faut tout le temps retourner une nouvelle version du state, donc on crée un object, copie le state dedans avec ... puis override les propritée
      // que cette action est censée modifier dans le state. Donc loading sera true jusqu'a ce qu'une autre action soit dispatchée:
      // 1- soit le fetch fonctionne et on dispatch l'objet (l'action) retournée par la fonction (action creator) jokeFetchDataSuccess, et dans ce cas la le 'case JOKE_FETCH_DATA_SUCCESS' en dessous va intervenir
      // (et parmis les operation qu'on fait dans ce case sur le state on reset loading a false)
      // 2- soit le fetch fail et on dispatch l'objet (l'action) retournée par la fonction (action creator) jokeHasErrored, et dans ce cas la le 'case JOKE_HAS_ERRORED:' au dessus va intervenir, et on resset loading a false,
      // on set error a true.
      return {
        ...state,
        loading: true,
        error: false,
      };
    case JOKE_FETCH_DATA_SUCCESS:
      // ici on recoit l'action dispatcher par l'appel a la fonction jokeFetchDataSuccess (action creator), qui est un object comme ca:
      // action = {
      //   type: JOKE_FETCH_DATA_SUCCESS,
      //   data,
      // }
      const { value } = action.data;
      return {
        ...state,
        currentJoke: value, // la joke recue devient la currentJoke
        byId: {
          ...state.byId, // on copied toutes les precedentes key/value pairs deja enregistrée (imagine qu'on a deja sucessfully fetch 10 jokes)
          [value.id]: value, // et on rajoute la nouvelle
        },
        loading: false, // on reset loading a false
        error: false, // et error a false (meme si il a peut etre jamais ete set a true, mais peut etre que juste avant on a eu un fetch fail et donc error est true, donc il faut le reset a false quand on a un fetch success)
      };
    // case LIKED_JOKE: a rajouter
    // case DISLIKED_JOKE: a rajouter
    case LIKED_JOKE:
 
    return {
      ...state,
      likedJokesIds: [
        ...state.likedJokesIds,
        state.currentJoke.id
      ]
    };
    case DISLIKED_JOKE:
 
    return {
      ...state,
      dislikedJokesIds: [
        ...state.dislikedJokesIds, 
        state.currentJoke.id
      ]
    };

    default:
      return state;
  }
};

export default jokesReducer;

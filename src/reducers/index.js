import {
  JOKE_HAS_ERRORED,
  JOKE_IS_LOADING,
  JOKE_FETCH_DATA_SUCCESS,
  LIKED_JOKE,
  DISLIKED_JOKE,
  REMOVE_JOKE,
} from '../actions/actionTypes';

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
      return {
        ...state,
        loading: true,
        error: false,
      };
    case JOKE_FETCH_DATA_SUCCESS:
      const { value } = action.data;
      return {
        ...state,
        currentJoke: value,
        byId: {
          ...state.byId,
          [value.id]: value,
        },
        loading: false,
        error: false,
      };
    case LIKED_JOKE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [state.currentJoke.id]: { ...state.currentJoke, liked: true },
        },
        likedJokesIds: [state.currentJoke.id, ...state.likedJokesIds],
      };
    case DISLIKED_JOKE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [state.currentJoke.id]: { ...state.currentJoke, liked: false },
        },
        dislikedJokesIds: [state.currentJoke.id, ...state.dislikedJokesIds],
      };

    case REMOVE_JOKE:
      const jokeToRemove = state.byId[action.payload];
      const targetArray = jokeToRemove.liked ? 'likedJokesIds' : 'dislikedJokesIds';
      const updatedJokesArray = state[targetArray].filter(key => key !== action.payload);
      const newById = { ...state.byId };
      delete newById[action.payload];

      return {
        ...state,
        byId: newById,
        [targetArray]: updatedJokesArray,
      };

    default:
      return state;
  }
};

export default jokesReducer;

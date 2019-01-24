const createStore = (reducer) => {
    let state;
    let listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };
    dispatch({});
    return { getState, dispatch, subscribe };
};

const middleware = [promise, logger];
// const middleware = [logger, promise];
const wrapDispatchWithMiddlewares = (store, middlewares) => {
    middlewares
        .slice() // copies the middleware array
        .reverse() // reverses it. As a convention, we specify the middlewares in the order in which the thing (in the case of redux, the ‘thing’ is an action) propagates through the chain of middlewares. We intuitively know that promise then logger is the correct order, however for this to happen, we first need to override store.dispatch with logger, and then the result of that with promise. So when the action comes in, the code added by applying the promise middleware will happen first, then logger. This is why we reverse the array!
        .forEach(middleware => {
            // on the first iteration, logger(store)(store.dispatch)
            // on the second iteration promise(store)(logger(store)(store.dispatch))
          // this is why the second curried argument is called next. It is the previously
            // ‘enhanced’ version of store.dispatch but it is also the next middleware in the chain
          // (as we said, first promise, then logger).
            store.dispatch = middleware(store)(store.dispatch);
        });
};

const func1 = middleware(store); 

const logger = (store) => {
  return function (next) {
    return function (action) {
      console.log(action)
      console.log('previous state', state)
      next(action)
      console.log('next state', state)
    }
  }
}

const thunk = store => next => action => {
    if (typeof action.then === 'function') {
        return action.then(store.dispatch);
    }
    return store.dispatch(action);
};

const actionCreator = () => ({
  type: x
  payload: 
})

fetching: true,
error: false,


const fetchNewJoke = () => async (dispatch) => {
  dispatch({type: 'fetching-joke'})
  try {
  	const newJoke = await fetch('url'); 
    dispatch({ type: 'success', payload: newJoke })
  } catch (e) {
    dispatch({ type: 'error' })
  }
}


class Container extends React.Component {
  
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchNewJoke())
  }
  
  render(){
    const { joke } = this.props;
    return (
<!--       { loading && <Loader> } -->
			<div onClick={this.handleClick}/> 
      ....
    )
  }
  
  
}



const loader = ({ fetching }) => {
  if fetching {}
  return (
  	
  )
}

const mapStateToProps = (state) => ({
  joke: state.joke,
  // hasErrored: state.jokeHasErrored,
  // isLoading: state.isLoading
})

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchData: (url) => dispatch(jokeFetchData(url))
//   }
// }

export default connect(mapStateToProps)(X)



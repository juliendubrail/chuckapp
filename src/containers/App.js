import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jokeFetchData } from '../actions/actions';

import Table from '../components/table';
import Hero from '../components/Hero';

import './App.css';


const API = 'http://api.icndb.com/jokes/random';

class App extends Component {
 
  state = {
    currentJoke: {},
    byId: {},
    likedJokesIds: [],
    dislikedJokesIds: [],
    jokeHasErrored: null,
    jokeIsLoading: false,
  };

  componentDidMount() {
    //this.props.fetchData(API);
    this.props.dispatch(jokeFetchData(API));
  }

  // fetchQuote = async () => {
  //   try {
  //     const response = await fetch(API, { method: 'GET' });
  //     const parsedResponse = await response.json();
  //     //this.setCurrentJoke(parsedResponse);
  //     this.setState({ currentJoke: parsedResponse, isLoading: false });
  //   } catch (error) {
  //     this.setState({ error, isLoading: false });
  //   }
  // };

  //setCurrentJoke = data => this.setState({ currentJoke: data.value, error:null, isLoading: false });
  
  handleVote = (liked = true) => {
    const { currentJoke } = this.state;
    const { id } = currentJoke;
    const targetArray = liked ? 'likedJokesIds' : 'dislikedJokesIds';
   
    this.setState(
      {
        byId: {
          ...this.state.byId,
          [id]: {
            ...currentJoke,
            liked,
          },
        },
        [targetArray]: [id, ...this.state[targetArray]],
      },
      this.fetchQuote,
    );
  };

  removeQuote = id => {
    const { byId } = this.state;
    const jokeToRemove = byId[id];
    const targetArray = jokeToRemove.liked ? 'likedJokesIds' : 'dislikedJokesIds';
    const updatedJokesArray = this.state[targetArray].filter(key => key !== id);
    const newById = { ...byId };
    delete newById[id];
    this.setState({
      byId: newById,
      [targetArray]: updatedJokesArray,
    });

  };

  render() {
    console.log(this.state); 
    //const {joke} = this.props;
   /*  const { joke, byId, likedJokesIds, dislikedJokesIds, error} = this.props;
    const likedJokes = likedJokesIds.map(id => byId[id]);
    const dislikedJokes = dislikedJokesIds.map(id => byId[id]);
    const allJokes = [...likedJokes, ...dislikedJokes]; */
    

    if (this.props.hasErrored) {
      return (
        <div className="app">
          {/* <p>{error.message}</p> */}
          <button onClick={this.props.jokeFetchData(API)}>Retry</button>
        </div>
      );
    }
    

    return (
      <div className="app">
        <Hero
          title={this.props.joke}
          heroActions
          heroActionsTitle={'Select a Category'}
          onHeroActionClick={this.handleVote}
        />
       
        {this.props.isLoading && <img alt="Loading..." src="https://i.imgur.com/LVHmLnb.gif" />}
        {/* <div className="tablecontainer">
          <Table data={likedJokes} removeQuote={this.removeQuote} />
          <Table data={dislikedJokes} removeQuote={this.removeQuote} />
          <Table data={allJokes} removeQuote={this.removeQuote} />
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      joke: state.currentJoke,
      hasErrored: state.jokeHasErrored,
      isLoading: state.jokeIsLoading
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//       fetchData: (url) => dispatch(jokeFetchData(url))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default connect(mapStateToProps)(App);
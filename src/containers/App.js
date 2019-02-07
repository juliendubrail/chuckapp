import React, { Component } from 'react';
import { connect } from 'react-redux';

import { jokeFetchData, categoryClicked, jokeIsRemoved } from '../actions/actions';

import Table from '../components/table';
import Hero from '../components/Hero';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.fetchJoke();
  }

  fetchJoke = () => this.props.dispatch(jokeFetchData());

  handleVote = liked => {
    this.props.dispatch(categoryClicked(liked));
    this.fetchJoke();
  };

  removeQuote = id => this.props.dispatch(jokeIsRemoved(id));

  render() {
    const { error, loading, currentJoke, likedJokesIds, byId, dislikedJokesIds } = this.props; //
    const likedJokes = likedJokesIds.map(id => byId[id]);
    const dislikedJokes = dislikedJokesIds.map(id => byId[id]);
    const allJokes = [...likedJokes, ...dislikedJokes];
    if (error) {
      return (
        <div className="app">
          <p>shiiiiiiiit</p>
          <button onClick={this.fetchJoke}>Retry</button>
        </div>
      );
    }

    return (
      <div className="app">
        <Hero
          title={currentJoke.joke}
          heroActions
          heroActionsTitle={'Select a Category'}
          onHeroActionClick={this.handleVote}
        />

        {loading && <img alt="Loading..." src="https://i.imgur.com/LVHmLnb.gif" />}
        <div className="tablecontainer">
          <Table data={likedJokes} removeQuote={this.removeQuote} />
          <Table data={dislikedJokes} removeQuote={this.removeQuote} />
          <Table data={allJokes} removeQuote={this.removeQuote} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps)(App);

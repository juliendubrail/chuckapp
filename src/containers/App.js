import React, { Component } from 'react';
import { connect } from 'react-redux';

import { jokeFetchData } from '../actions/actions';

import Table from '../components/table';
import Hero from '../components/Hero';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.fetchJoke();
  }

  fetchJoke = () => this.props.dispatch(jokeFetchData());

  handleVote = liked => {
    // appeler un action creator (comment tu fais dans componentDidMount) ici pour updater le redux store apres chaque vote
    // cette action creator doit:
    // 1- dispatcher une action qui une fois recu par le redcuer sauvegardera l'id de la current joke comment le premiere elements de la 'likedJokesIds' array ou dans la 'dislikedJokesIds' array en fonction de la valeur de like (true or false)
    // 2- directement apres il faut fetch une nouvelle action, donc appeler dispatch(jokeFetchData()), du coup l'action creator pourrait etre un thunk.
  };

  render() {
    const { error, loading, currentJoke } = this.props; //
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
        {/* <div className="tablecontainer">
          <Table data={likedJokes} removeQuote={this.removeQuote} />
          <Table data={dislikedJokes} removeQuote={this.removeQuote} />
          <Table data={allJokes} removeQuote={this.removeQuote} />
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});
// comme on a besoin de l'ensembe du state on spread tout, c'est equivalent a:
// const mapStateToProps = state => {
//   return {
//     currentJoke: state.currentJoke, <== on en a besoin pour la passer au Hero component
//     byId: state.byId, <== on aura besoin de byId, likedJokesIds et dislikedJokesIds pour montrer les jokes dans les Table components
//     likedJokesIds: state.likedJokes,
//     dislikedJokesIds: state.dislikedJokes,
//     error: state.error, <== dont on a besoin pour savoir si on doit monter le error message
//     loading: state.loading, <== dont on a besoin pour savoir si on doit montrer l'error img
//   };
// };

// connect est un HOC qui recoit le state est le passe a mapStateToProps (c'est pour ca que mapStateToProps le recoit en argument).
// la faconn dont connect recoit le state est via le React context. Te prend pas la tete avec ca pour le moment mais en gros le Provider dans index.js le met dans le context
// quand on fait <Provider store={store}> et connect subscribe au context et donc a access au store.
// donc mapStateToProps retourn un object et cet object est spread dans App. On pourra regarder connect en detail une fois que tu sera plus a l'aise avec redux
// pour le moment tout ce que tu as besoin de savoir c'est que:
// 1- a chaque fois que le state change, connect resoit le nouveau state
// 2- connect a access a mapStateToProps puisqu'on lui a passé nous meme
// 3- connect passe le nouveau state a mapStateToProps
// 4- mapStateToProps retourn un nouvel object, et chaque key de cet object devient un nouvelle prop passer a App
// c'est comme si dans notre example connect faisait un truc du genre: <App currentJoke={state.currentJoke} error={state.error} loading={state.loading} etc... />
// c'est pour ca qu'on a acces a ces valeurs dans this.props dans App.
export default connect(mapStateToProps)(App);

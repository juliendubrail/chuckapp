import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // si tu n'utilise pas le constructor pour autre chose que pour set le initial state tu peux
  // simplement faire ca:
  state = {
    quote: 'Chuck Quote',
  };

  changeQuote = () => {
    this.setState({ quote: 'Chuck Rules' });
  };

  searchQuote = () => {
        const FETCH_URL = 'http://api.icndb.com/jokes/random';
        fetch(FETCH_URL, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => console.log('json', json))
   };

  render() {
    // c'est bien de prendre l'habite de desctucturer, meme si la c'est overkill
    const { quote } = this.state;

    return (
      <div className="App">
        <div className="App-title">{quote}</div>
        <div>
          {/* 
        il vaut mieux eviter le plus possible de definir des fonctions dans le jsx. Tu peux check les 
        raisons dans ici: https://stackoverflow.com/questions/36677733/why-shouldnt-jsx-props-use-arrow-functions-or-bind
        Du coup pour le onClick event handler, on peu referencer la App class method "changeQuote" directement au lieu de crer une fonction qui call changeQuote.
        L'event rest disponible comme premier argument de this.changeQuote si t'en as besoin.
        */}
          <button className="button" onClick={this.changeQuote}>
            Yay button
          </button>
           <button className="button" onClick={this.searchQuote}>Nay button</button>
        </div>
        App Component
      </div>
    );
  }
}

export default App;

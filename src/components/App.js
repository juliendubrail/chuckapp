import React, { Component } from 'react';
import Table from './table';
import './App.css';

class App extends Component {
  // si tu n'utilise pas le constructor pour autre chose que pour set le initial state tu peux
  // simplement faire ca:
  state = {
    quote: 'Chuck Quote',
    columns: [
        {
            id:"1",
            abbvTitle: 'Good',
        items:[
            {quote:'Chuckk'}
        ],
        clicked: false
    },
    {
        id:"2",
        abbvTitle:'Bad',
        items:[
            {quote: null}
        ],
        clicked:true
    },
    {
        id:3,
        abbvTitle:'All',
        items:[
            {quote:null}
        ]
    }]
};

  changeQuote = () => {
    this.setState({ quote: 'Chuck Rules' });
  };

  fetchQuote = () => {
        const FETCH_URL = 'http://api.icndb.com/jokes/random';
        fetch(FETCH_URL, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
        const quote = json.value.joke;
        this.setState({quote})
        } )
        .catch(error =>console.log(error))
   };

   getClickedButton = () => {
       return this.state.columns.find((button) => button.clicked)
   }

   setCategory = (buttonId) => {
       // this.state.columns.map((buttonObj) =>
       // buttonObj.id === buttonId ? buttonObj.clicked = true : buttonObj.clicked = false
       console.log(buttonId)
       console.log(this.state.columns.map((button) => button.clicked))
       //this.state.columns.map((category) => buttonId === category.id ? category.clicked = true : category.clicked = false)
    }

   submitQuote = (quote, id) => {
       // this.setClickedButton(id);
       this.setCategory(id)
       const clickedButton = this.getClickedButton();
       clickedButton.items.push(quote)
       console.log(this.state.columns[1].items)
   }

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
          <button className="button" id="1" onClick={this.submitQuote({quote}, this.id)}>
            Yay button
          </button>
           <button className="button" id="2" onClick={this.fetchQuote}>
               Nay button
           </button>
           <button className="button" id="3" onClick={this.setCategory()}>Test</button>
       </div>
        <Table />

        App Component
      </div>
    );
  }
}

export default App;

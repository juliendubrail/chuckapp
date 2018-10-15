import React, { Component } from 'react';
import Table from './table';
import MenuButtons from './menuButtons';
import './App.css';

class App extends Component {
  state = {
    quote: 'Chuck Quote',
    columns: [
        {
            id:'good',
            abbvTitle: 'Good',
        items:[
            {quote:'Chuckk'}
        ],
        clicked: false
    },
    {
        id:'bad',
        abbvTitle:'Bad',
        items:[
            {quote: null}
        ],
        clicked:true
    },
    {
        id:'all',
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
   };

   setCategory = (clicked_id) => {
       console.log(this.state.columns.map((button) => button.clicked))
       this.state.columns.map((category) => clicked_id === category.id ? category.clicked = true : category.clicked = false)
    }

    updateQuotes = (e) => {
        console.log(e);
        this.fetchQuote();
        this.setCategory(e);
        const clickedButton = this.getClickedButton();
        clickedButton.items.push(this.state);
        console.log(this.state);
    }

   submitQuote = (quote, e) => {
       this.setCategory(e);
       const clickedButton = this.getClickedButton();
       clickedButton.items.push(quote)
       console.log(this.state.columns[1].items)
   };

  render() {
    const { quote } = this.state;

    return (
      <div className="App">
        <div className="App-title">{quote}</div>
        <MenuButtons updateQuotes={this.updateQuotes} />
        <Table colums={this.state.columns}/>
        App Component
      </div>
    );
  }
}

export default App;

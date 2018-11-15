import React, { Component } from 'react';
import Table from './table';
import MenuButtons from './menuButtons';
import './App.css';

const API = 'http://api.icndb.com/jokes/random';

class App extends Component {
  state = {
    newQuote: '',
    quotes: []
};

componentDidMount(){
    this.fetchQuote();
}

  changeQuote = () => {
    this.fetchQuote();
    console.log(this.state.quotes);
  };

  fetchQuote = () => {
        fetch(API, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
        this.setState({newQuote: {id:data.value.id, text:data.value.joke}})
        })
        .catch(error =>console.log(error))
   };

   addQuote = (e) => {
        console.log(e.target.id);
       this.setState({
           quotes: [...this.state.quotes, {
               id:this.state.newQuote.id,
               text: this.state.newQuote.text,
               category: e.target.id
           }]
       });
       this.fetchQuote();
    console.log(this.state.quotes);
   };

  render() {
    const { newQuote } = this.state;

    return (
      <div className="App">
        <div className="App-title"> {'"' + newQuote.text + '"'} </div>
        <MenuButtons changeQuote={this.changeQuote} addQuote={this.addQuote}/>
        <Table
            allQuotes={this.state.quotes}
            />
        App Component
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            quote: 'Chuck Quote'
        }
    }

    changeQuote(){
        this.setState({quote:'Chuck Rules'})
    }

    searchQuote = () => {
        const FETCH_URL = 'http://api.icndb.com/jokes/random';
        fetch(FETCH_URL, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => console.log('json', json))
    };

    render(){
        return (
            <div className="App">
                <div className="App-title">{this.state.quote}</div>
                <div>
                    <button className="button" onClick={()=>this.changeQuote()}>Yay button</button>
                    <button className="button" onClick={this.searchQuote}>Nay button</button>
                </div>
                App Component
            </div>
        )
    }
}

export default App;

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

    render(){
        return (
            <div className="App">
                <div className="App-title">{this.state.quote}</div>
                <div>
                    <button className="button" onClick={()=>this.changeQuote()}>Yay button</button>
                    <button className="button">Nay button</button>
                </div>
                App Component
            </div>
        )
    }
}

export default App;

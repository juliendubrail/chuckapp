import React, { Component } from 'react';
import QuotesApi from '../api';

class Table extends Component {

    render() {
        const allQuotes = this.props.allQuotes.map(q => (<li key={q.id}> { '"' + q.text + '"'}</li>));
        const goodQuotes = this.props.allQuotes.filter(q => q.category === 'good').map(q => (<li key={q.id}> { '"' + q.text + '"'}</li>));
        const badQuotes = this.props.allQuotes.filter(q => q.category === 'bad').map(q=>(<li key={q.id}> { '"' + q.text + '"'}</li>));
        return(
             <div className="tablecontainer">
                <div className="column" id="good">
                    <h4>Good Jokes</h4>
                    <ul>{goodQuotes}</ul>
                </div>
                <div className="column" id="bad" >
                    <h4>Bad Jokes</h4>
                    <ul>{badQuotes}</ul>
                </div>
                <div className="column" id="all">
                    <h4>All Jokes</h4>
                    <ul>{allQuotes}</ul>
                </div>
                Table Component

            </div>
        )
    }
}

export default Table;

import React, { Component } from 'react';
import QuotesApi from '../api';

class Table extends Component {



    render() {
        const allQuotes = QuotesApi.all().map(q => (<li key={q.number}> {q.quote}</li>));
        const badQuotes = QuotesApi.get().map(q => (<li key={q.number}> {q.quote}</li>));

        return(
             <div className="tablecontainer">
                <div className="column" id="good">
                    <h4>Good Jokes</h4>
                    <p className="table_quote">Chuck Norris doesn't use GUI, he prefers COMMAND line.</p>
                </div>
                <div className="column" id="bad">
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

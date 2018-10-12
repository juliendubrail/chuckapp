import React, { Component } from 'react';

class Table extends Component {
    render() {
        return(
            <div className="tablecontainer">
                <div className="column">
                    <h4>Good Jokes</h4>
                    <p className="table_quote">Chuck Norris doesn't use GUI, he prefers COMMAND line.</p>
                </div>
                <div className="column">
                    <h4>Bad Jokes</h4>
                </div>
                <div className="column">
                    <h4>All Jokes</h4>
                </div>
                Table Component
            </div>
        )
    }
}

export default Table;

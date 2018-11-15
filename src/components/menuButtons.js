import React, {Component} from 'react';

class MenuButtons extends Component {


    render() {
        return (
        <div className="menuButtons">
        <h5>Select a Category</h5>
        <button className="button" id="good" onClick={this.props.addQuote}>Yay</button>
        <button className="button" id="bad" onClick={this.props.addQuote}>Nay</button>
        <button className="button" id="all" onClick={this.props.addQuote}>Test</button>
        </div>
        )

    }

}

export default MenuButtons;

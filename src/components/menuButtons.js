import React, {Component} from 'react';

class MenuButtons extends Component {

    setCategory = (e) => {
        this.props.updateQuotes(e.target.id);
    }

    render() {
        return (
        <div className="menuButtons">
        <h5>Select Category</h5>
        <button className="button" id="good" onClick={this.setCategory}>Yay</button>
        <button className="button" id="bad" onClick={this.setCategory}>Nay</button>
        <button className="button" id="all" onClick={this.setCategory}>Test</button>
        </div>
        )

    }

}

export default MenuButtons;

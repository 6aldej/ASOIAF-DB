import React, { Component } from 'react';

import './searchPanel.css';

export default class SearchPanel extends Component {

    state = {
        term: ''
    }

    onUpdateSearch = this.onUpdateSearch.bind(this);

    onUpdateSearch(event) {
        const term = event.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    render() {
        return (
            <div className="search-panel">
                <input
                    className="form-control search-input"
                    type="text"
                    placeholder="Enter character's full name"
                    onChange={this.onUpdateSearch}
                />
                <button disabled={this.props.btnflag} onClick={this.props.searchStart}>Search</button>
            </div>
        )
    }

}
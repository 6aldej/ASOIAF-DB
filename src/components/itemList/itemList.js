import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotService.js';
import Spinner from '../spinner';

export default class ItemList extends Component {

    gotService = new gotService();
    
    state = {
        clearList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charlist) => {
                this.setState({
                    charlist
                })
            })
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            return (
                <li 
                    key={i}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(41 + i)}
                    >
                    {item.name}
                </li>
            )
        })
    }

    render() {

        const {charlist} = this.state;

        if (!charlist) {
            return <Spinner/>
        }
        
        const items = this.renderItems(charlist);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
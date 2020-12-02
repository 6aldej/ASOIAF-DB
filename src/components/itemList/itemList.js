import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';

export default class ItemList extends Component {

    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props
    
        getData()
            .then( (itemlist) => {
                this.setState({
                    itemlist
                })
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {label}
                </li>
            )
        })
    }

    render() {

        const {itemlist} = this.state;

        if (!itemlist) {
            return <Spinner/>
        }
        
        const items = this.renderItems(itemlist);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
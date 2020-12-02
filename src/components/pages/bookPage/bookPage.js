import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService.js';
import RowBlock from '../../rowBlock';

export default class BookPage extends Component {
    gotService = new gotService();

    state = {
        selectedBook: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    
    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render () {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => `${name}`}
            />
        )

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedBook}
                getData={this.gotService.getBook}
            >
                <Field field="numberOfPages" label="Number of pages"/>
                <Field field="released" label="Released"/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}
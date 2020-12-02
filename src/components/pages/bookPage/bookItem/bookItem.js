import React, {Component} from 'react';
import ItemDetails, {Field} from '../../../itemDetails';
import gotService from '../../../../services/gotService.js';


export default class BookItem extends Component {

    gotService = new gotService();

    render () {

        return (
            <ItemDetails 
                itemId={this.props.bookId}
                getData={this.gotService.getBook}
            >
                <Field field="numberOfPages" label="Number of pages"/>
                <Field field="released" label="Released"/>
            </ItemDetails>   
        )
    }
}
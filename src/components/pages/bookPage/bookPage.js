import React, {Component} from 'react';
import ItemList from '../../itemList';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService.js';
import {withRouter} from 'react-router-dom';

class BookPage extends Component {
    gotService = new gotService();

    state = {
        error: false,
        page: 1
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onNextPage = () => {
        let page = this.state.page;
        let curPage = ++page;
        
        if (curPage>2) {
            curPage=2;
        }

        this.setState({
            page: curPage
        })
    }

    onPrevPage = () => {
        let page = this.state.page;
        let curPage = --page;
        
        if (curPage<1) {
            curPage=1;
        }

        this.setState({
            page: curPage
        })
    }

    render () {
        const {page} = this.state

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <ItemList
                page={page}
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                onPrevPage={this.onPrevPage}
                onNextPage={this.onNextPage}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => `${name}`}
            />
        )
    }
}

export default withRouter(BookPage);
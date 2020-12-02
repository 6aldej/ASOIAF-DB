import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService.js';
import RowBlock from '../../rowBlock';

export default class CharacterPage extends Component {
    gotService = new gotService();

    state = {
        selectedChar: null,
        error: false,
        page: 5,
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    
    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    onNextPage = () => {
        let page = this.state.page;
        let curPage = ++page;
        
        if (curPage>2138) {
            curPage=2138;
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
        console.log(this.state.page)

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                page={this.state.page}
                onItemSelected={this.onItemSelected}
                onPrevPage={this.onPrevPage}
                onNextPage={this.onNextPage}
                getData={(a) => this.gotService.getAllCharacters(a)}
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        )

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedChar}
                getData={this.gotService.getCharacter}
            >
                <Field field="gender" label="Gender"/>
                <Field field="born" label="Born"/>
                <Field field="died" label="Died"/>
                <Field field="culture" label="Culture"/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}
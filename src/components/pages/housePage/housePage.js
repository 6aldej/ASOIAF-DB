import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService.js';
import RowBlock from '../../rowBlock';

export default class HousePage extends Component {
    gotService = new gotService();

    state = {
        selectedHouse: null,
        error: false,
        page: 1,
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    
    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    onNextPage = () => {
        let page = this.state.page;
        let curPage = ++page;
        
        if (curPage>45) {
            curPage=45;
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

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                page={this.state.page}
                onItemSelected={this.onItemSelected}
                onPrevPage={this.onPrevPage}
                onNextPage={this.onNextPage}
                getData={(a) => this.gotService.getAllHouses(a)}
                renderItem={({name}) => `${name}`}
            />
        )

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedHouse}
                getData={this.gotService.getHouse}
            >
                <Field field="name" label="Name"/>
                <Field field="region" label="Region"/>
                <Field field="words" label="Words"/>
                <Field field="titles" label="Titles"/>
                <Field field="ancestralWeapons" label="Ancestral Weapons"/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}
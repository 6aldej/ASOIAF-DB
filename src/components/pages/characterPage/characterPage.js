import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService.js';
import RowBlock from '../../rowBlock';
import SearchPanel from '../../searchPanel';

export default class CharacterPage extends Component {
    gotService = new gotService();

    state = {
        selectedChar: null,
        error: false,
        page: 5,
        term: '',
        search: false,
        btnflag: true
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

    onUpdateSearch = (term) => {
        this.setState({term, search:false})
        if (term) {
            this.setState({btnflag:false})
        } else {
            this.setState({btnflag:true})
        }
    }

    searchStart = () => {
        this.setState({search:true})
    }

    render () {
        const {search, page, term, btnflag} = this.state

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                page={page}
                term={term}
                search={search}
                onItemSelected={this.onItemSelected}
                onPrevPage={this.onPrevPage}
                onNextPage={this.onNextPage}
                getData={(a) => this.gotService.getAllCharacters(a)}
                getName={(a) => this.gotService.getCharacterByName(a)}
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        )

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedChar}
                getData={this.gotService.getCharacter}
                label={'character'}
            >
                <Field field="gender" label="Gender"/>
                <Field field="born" label="Born"/>
                <Field field="died" label="Died"/>
                <Field field="culture" label="Culture"/>
            </ItemDetails>
        )

        return (
            <>
                <SearchPanel 
                    searchStart={this.searchStart} 
                    btnflag={btnflag} 
                    onUpdateSearch={this.onUpdateSearch}
                />
                <RowBlock 
                    left={itemList} 
                    right={itemDetails}
                />
            </>
        )
    }
}
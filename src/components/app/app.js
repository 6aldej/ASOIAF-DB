import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/bookPage';
import BookItem from '../pages/bookPage/bookItem';
import HousePage from '../pages/housePage';
import WelcomPage from '../pages/welcomPage';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

    state = {
        showRandomChar: true,
        error: false,
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Route path='/' exact render={
                        () => {
                            return <WelcomPage char={char} toggleRandomChar={this.toggleRandomChar}/>
                        }
                        }/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BookItem bookId={id}/>}
                            }/>

                    </Container>
                </div>
            </Router>
        );
    }
}
import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import logoImg from '../../img/logo.png'
import './header.css';

const Header = () => {
    return (
        <div className="header-block">
            <div className="header-title">
                <Link to='/'>
                    <img src={logoImg} alt="logo"/>
                </Link>
            </div>
            <ul className="header-links">
                <li>
                    <NavLink to='/characters/' activeClassName="active">Characters</NavLink>
                </li>
                <li>
                    <NavLink to='/houses/' activeClassName="active">Houses</NavLink>
                </li>
                <li>
                    <NavLink to='/books/' activeClassName="active">Books</NavLink>   
                </li>
            </ul>
        </div>
    );
};

export default Header;
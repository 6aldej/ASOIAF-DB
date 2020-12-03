import React from 'react';
import './errorMessage.css';
import errorImg from '../../img/error.jpg'

const ErrorMessage = () => {
    return (
        <>
            <img src={errorImg} alt='error'/>
            <span>Something went wrong!!!</span>
        </>
    )
}

export default ErrorMessage;
import React from 'react';
import './spinner.css';

const Spinner = () => {
    return (
        <div className="loader">
            <div className="loadingio-spinner-gear">
                <div className="ldio">
                    <div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        </div>
    )
}

export default Spinner;
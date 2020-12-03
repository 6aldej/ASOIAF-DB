import React from 'react';
import {Col, Row} from 'reactstrap';
import './welcomPage.css'

const WelcomPage = ({char, toggleRandomChar}) => {
        return (
            <div className="welcom-page">
                <h1>Welcome&emsp;to&emsp;the&emsp;Game&emsp;Of&emsp;Thrones&emsp;database</h1>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                        <button
                            className="toggle-btn"
                            onClick={toggleRandomChar}> 
                            RANDOM Character 
                        </button>
                        {char}
                    </Col>
                    <Col lg={{size: 5, offset: 0}}>
                        <div className="information">
                        <h2>The app will help you find out more information about your favorite characters, Houses, or books.</h2>
                        </div>
                    </Col>
                </Row>
            </div>
        )
}

export default WelcomPage;
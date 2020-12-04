import React from 'react';
import {Col, Row} from 'reactstrap';

const RowBlock = ({left, right}) => {
    return (
    <Row>
        <Col className="left" md='6'>
            {left}  
        </Col>
        <Col className="right" md='6'>
            {right}
        </Col>
    </Row>
    )
}

export default RowBlock;
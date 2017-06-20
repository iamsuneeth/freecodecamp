import React from 'react';
import {PageHeader, Row, Col} from 'react-bootstrap';
const Header = (props) => (
        <Row className={'header'}>
            <Col xs={12} md={12}>
            <PageHeader>Tic-Tac-Toe <small>a freecodecamp project</small></PageHeader>
            </ Col>
        </ Row>
)

export default Header;
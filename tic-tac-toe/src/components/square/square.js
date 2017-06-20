import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './square.css';

const Square = (props) => (
    <Button   onClick={props.mark}><span>{props.value}</span></Button>
);


Square.PropTypes = {
    value: PropTypes.number,
    mark: PropTypes.func
}

export default Square;
import React from 'react';
import PropTypes from 'prop-types';
import './square.css';

const Square = (props) => (
    <button className={'square'} disabled={props.disabled} onClick={props.mark}>{props.value}</button>
);


Square.PropTypes = {
    value: PropTypes.number,
    mark: PropTypes.func
}

export default Square;
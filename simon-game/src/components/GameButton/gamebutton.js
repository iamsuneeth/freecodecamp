import React from 'react';
import propTypes from 'prop-types';
import './game-button.css';

export default props => (
    <div className={"btn btn-"+props.id} id={props.id}></div>
)
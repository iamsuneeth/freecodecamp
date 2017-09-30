import React from 'react';
import propTypes from 'prop-types';
import './button.css';

export default props => (
    <div>
        <div className="round-btn" onClick={props.onClick}>
        </div>
        <label htmlFor="">{props.label}</label>
    </div>
)
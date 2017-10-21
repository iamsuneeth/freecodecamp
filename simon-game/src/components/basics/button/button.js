import React from 'react';
import propTypes from 'prop-types';
import './button.css';

export default props => (
    <div>
        {props.indicator && <div className="strictindicator"><span className={props.strict?'active':''}></span></div>}
        <div style={{backgroundColor:props.color}} className="round-btn" onClick={props.onClick}>
        </div>
        <label htmlFor="">{props.label}</label>
    </div>
)
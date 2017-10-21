import React from 'react';
import propTypes from 'prop-types';
import './game-button.css';

export default props => (
    <button disabled={!props.clickable} className={"btn btn-"+props.id+(props.clickable?" clickable":"")+(props.glow===props.id?" glow":"")} id={"button-"+props.id} onClick={() => props.onClick(props.id)}></button>
)
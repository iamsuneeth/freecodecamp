import React from 'react';
import propTypes from 'prop-types';
import Control from '../Controls/control';
import Display from '../basics/display/display';
import './middle.css';

export default props => (
    <div className="middle">
        <h2 className="name">SIMON&copy;</h2>
        <Control />
        <Display />
    </div>
)
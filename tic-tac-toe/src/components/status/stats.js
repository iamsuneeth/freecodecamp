import React from 'react';
import PropTypes from 'prop-types';
import './stats.css';

const Stats = (props) => (
    
    <div className={'stat-section-row'}>
        <div className={'stat-section'}>
        <label htmlFor="">Games</label>
        <span>{props.info.games}</span>
        </div>
        <div className={'stat-section'}>
        <label htmlFor="">X</label>
        <span>{props.info.x}</span>
        </div>
        <div className={'stat-section'}>
        <label htmlFor="">O</label>
        <span>{props.info.o}</span>
        </div>
        <div className={'stat-section'}>
        <label htmlFor="">Draw</label>
        <span>{props.info.t}</span>
        </div>
    </div>

)

export default Stats;
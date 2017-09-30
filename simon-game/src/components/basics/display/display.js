import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import './display.css';

const Display =  props => (
    <div className="count">
        <div className="row display">
            <div className="col">
                <div className={props.active?" active":""}>{(props.power && props.step>0)?props.step:'--'}</div>
            </div>
        </div>
        <div className='row'>
            <label className='label' htmlFor="">COUNT</label>
        </div>
    </div>
)



const mapStateToProps = state => ({
    power:state.power,
    active:state.active,
    step:state.step
});

export default connect(mapStateToProps)(Display);
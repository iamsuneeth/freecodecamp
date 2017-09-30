import React from 'react';
import PropTypes from 'prop-types';
import './switch.css';

const Switch = props => (
    <div className="row">
        <div className="col align-self-center">
            <label htmlFor="">OFF</label>
        </div>
        <div className="col col-sm-4">
                <div className="switch-container" onClick={props.onClick}>
                    <div className={"switch"+(props.power?" on":"")}></div>
                </div>
        </div>
        <div className="col align-self-center">
                <label htmlFor="">ON</label>
        </div>
    </div>
)

Switch.propTypes = {
    power: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Switch;
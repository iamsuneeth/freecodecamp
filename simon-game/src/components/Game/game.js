import React from 'react';
import propTypes from 'prop-types';
import GameButton from '../GameButton/gamebutton';
import Middle from '../Middle/middle';
import {
    powerToggle,
    strictToggle,
    start
} from '../../actions';
import './game.css';

export default props => (
    <div className="game">
        <div className="gamerow">
            <GameButton id='green'/>
            <GameButton id='red'/>
        </div>
        <div className="gamerow">
            <GameButton id='yellow'/>
            <GameButton id='blue'/>
        </div>
        <Middle />
    </div>

)

const mapStateToProps = state => ({
    power:state.power,
    active:state.active,
    strict:state.strict
});

const mapDispatchToProps = dispatch => ({
    powerToggle:() => dispatch(powerToggle()),
    strictToggle:() => dispatch(strictToggle()),
    start:() => dispatch(start())
})
import React, { Component } from 'react';
import Board from '../board/board';
import RadioGroup from '../radioGroup/radio-group';
import GameType from '../models/gameType';
import './game.css';

const GAME_TYPES = {
    ONE_PLAYER : '1',
    TWO_PLAYER : '2'
}

const PLAYER = {
    X: 'x',
    O: 'o'
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComplete: false,
            winner: 'none',
            type: "1",
            player: 'x',
            stage: "one"

        }
    }



    setGameState(player) {
        this.setState({
            winner: player,
            isComplete: true
        })
    }

    setGameType(event) {
        this.setState({
            type: GAME_TYPES[event.target.value],
            stage: "two"
        })
    }

    setPlayerType(event) {
        this.setState({
            player:PLAYER[event.target.value],
            stage:"three"
        })
    }

    render() {
        return (
            <div className={'game container'}>
                {this.state.stage === "three" && <Board isComplete={this.state.isComplete}
                    setGameState={(player) => this.setGameState(player)} type={this.state.type} user={this.state.player} />}
                {this.state.isComplete && <div className={'buttonContainer'}><button>Reset</button></div>}
                {this.state.stage === "one" && <GameType name="type" values={Object.keys(GAME_TYPES)} optionChange={(event)=> this.setGameType(event)}/>}
                {this.state.stage === "two" && <RadioGroup name="player" values={Object.keys(PLAYER)} optionChange={(event)=> this.setPlayerType(event)}/>}
                
            </div>
        )
    }
}

export default Game;
import React, { Component } from 'react';
import Board from '../board/board';
import GameType from '../models/gameType';
import Stats from '../status/stats';
import {Row, Col} from 'react-bootstrap';
import './game.css';

const GAME_TYPES = {
    ONE_PLAYER : {
        label: 'One Player',
        value:1
    },
    TWO_PLAYER : {
        label: 'Two Player',
        value:2
    }
}

const PLAYER = {
    X: {
        label: 'X',
        value:'x'
    },
    O: {
        label: 'O',
        value:'o'
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComplete: false,
            winner: 'none',
            type: "1",
            player: 'x',
            currentPlayer: '',
            nextPlayer: '',
            stage: "one",
            stats: {
                games:0,
                x:0,
                o:0,
                t:0
            }

        }
    }



    setGameState(player) {
        let stats = this.state.stats;
        stats.games+=1;
        stats[player]+=1;
        this.setState({
            winner: player,
            isComplete: true,
            currentPlayer: player!=='t'?player:'x',
            nextPlayer: player!=='t'?(player === 'x'?'o':'x'):'o',
            stats
        });
    }

    setGameType(event) {
        console.log(event.target.value);
        this.setState({
            type: event.target.value,
            stage: "two"
        })
    }

    setPlayerType(event) {
        console.log(event.target.value);
        this.setState({
            player: event.target.value,
            currentPlayer: event.target.value,
            nextPlayer: event.target.value === 'x'?'o':'x',
            stage:"three"
        })
    }

    setCurrent = ()=> {
        let nextPlayer = this.state.currentPlayer;
        let currentPlayer = this.state.nextPlayer;
        this.setState({
            currentPlayer,
            nextPlayer
        });
    }

    render() {
        return (
            <div className={'game container'}>
                {this.state.stage === "three" && <Row className={'game-container'}>
                <Col md={6} lg={6} className={'board-container'}>
                <h3>Tic-Tac-Toe Board</h3>
                <Board isComplete={this.state.isComplete}
                    setGameState={(player) => this.setGameState(player)} type={this.state.type} user={this.state.player} current={this.state.currentPlayer} next={this.state.nextPlayer} swap={this.setCurrent}/>
                </Col>
                <Col md={6} lg={6} className={'score-card'}>
                <h3>Score Card</h3>
                <Stats info={this.state.stats} />
                </Col>
                </Row>}
                <div className={'turn'}>
                    <span className={'message'}>
                        <h3>Next Turn : {this.state.currentPlayer}</h3>
                    </span>
                </div>
                {this.state.isComplete && <div className={'buttonContainer'}><button>Reset</button></div>}
                {this.state.stage === "one" && <GameType title="How do you want to play today!!!!!" name="type" values={GAME_TYPES} optionChange={(event)=> this.setGameType(event)}/>}
                {this.state.stage === "two" && <GameType title="Choose your side!!!!!" name="player" values={PLAYER} optionChange={(event)=> this.setPlayerType(event)}/>}
                
            </div>
        )
    }
}

export default Game;
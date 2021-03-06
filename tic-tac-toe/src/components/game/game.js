import React, { Component } from 'react';
import Board from '../board/board';
import GameType from '../models/gameType';
import Stats from '../status/stats';
import Message from '../common/messageBox';
import {Row, Col, Button} from 'react-bootstrap';
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
            turnClass:'',
            stats: {
                games:0,
                x:0,
                o:0,
                t:0
            },
            message: {
                text: '',
                class:'content'
            }

        }

        this.classes = {
            stageOne:'content showContent',
            stageTwo: 'content',
            stageThree: 'content'
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
        this.classes= {
            stageOne:'content hideContent',
            stageTwo:'content showContent',
            stageThree: 'content'
        };
    }

    setPlayerType(event) {
        console.log(event.target.value);
        this.setState({
            player: event.target.value,
            currentPlayer: event.target.value,
            nextPlayer: event.target.value === 'x'?'o':'x',
            stage:"three",
            boardLoaded:true
        });
        this.classes= {
            stageOne:'content hideContent',
            stageTwo:'content hideContent',
            stageThree:'content showContent'
        };
    }

    setCurrent = ()=> {
        this.setState({
            turnClass:'hideTurn'
        });
        let nextPlayer = this.state.currentPlayer;
        let currentPlayer = this.state.nextPlayer;
        setTimeout(()=>{
            this.setState({
            currentPlayer,
            nextPlayer,
            turnClass:''
            });
        },(this.state.type==='1' && this.state.currentPlayer!==this.state.player)?500:250);
    }

    showMessages = () => {
        if(this.state.winner === this.state.player){
            this.setState({
                message:{
                    text : 'Great!!!! You Won...',
                    class: 'showContent'
                }
            });
        }else if(this.state.winner === 't'){
            this.setState({
                message:{
                    text: 'Mmmm!!!! It was a draw...',
                    class: 'showContent'
                }
            });
        }else{
            this.setState({
                message:{
                    text: 'Uh Oh!!! Better luck next time....',
                    class: 'showContent'
                }
            });
        }
    }

    hideMessages = () => {
        this.setState({
                message:{
                    text: '',
                    class: ''
                }
            });
    }

    reset = () => {
        this.setState({
            isComplete: false,
            winner: 'none',
            type: "1",
            player: 'x',
            currentPlayer: '',
            nextPlayer: '',
            stage: "one",
            turnClass:'',
            stats: {
                games:0,
                x:0,
                o:0,
                t:0
            },
            message: {
                text: '',
                class:'content'
            } 
        });
        this.classes = {
            stageOne:'content showContent',
            stageTwo: 'content',
            stageThree: 'content'
        }
    }

    render() {
        return (
            <div className={'game container'}>
                {this.state.stage === "three" && <div className={'topbar'}>
                    <span className={'reset'}>
                        <Button onClick={this.reset}>{'Reset Game'}</Button>
                    </span>
                    <span className={'turn '+this.state.turnClass}>
                        {this.state.type==='1' && (this.state.currentPlayer===this.state.player?<h3>Your turn!!</h3>:<h3>Computer's turn!!</h3>)}
                        {this.state.type==='2' && (this.state.currentPlayer===this.state.player?<h3>Player 1's turn!!</h3>:<h3>Player 2's turn!!</h3>)}
                    </span>
                </div>}
                <Row className={'game-container'}>
                <Col md={6} lg={6} xs={12} className={'board-container '+this.classes.stageThree}>
                <h3>Tic-Tac-Toe Board</h3>
                <Board isComplete={this.state.isComplete}
                    showMessages={this.showMessages}
                    hideMessages={this.hideMessages}
                    setGameState={(player) => this.setGameState(player)} type={this.state.type} user={this.state.player} current={this.state.currentPlayer} next={this.state.nextPlayer} swap={this.setCurrent}/>
                </Col>
                <Col md={6} lg={6} xs={12} className={'score-card '+this.classes.stageThree}>
                <h3>Score Card</h3>
                <Stats info={this.state.stats} />
                </Col>
                </Row>
                <GameType title="How do you want to play today!!!!!" name="type" classes={this.classes.stageOne} values={GAME_TYPES} optionChange={(event)=> this.setGameType(event)}/>
                <GameType title="Choose your side!!!!!" name="player" classes={this.classes.stageTwo} values={PLAYER} optionChange={(event)=> this.setPlayerType(event)}/>
                <Message className={this.state.message.class} message={this.state.message.text}/>
            </div>
        )
    }
}

export default Game;
import React from 'react';
import Square from '../square/square';
import './board.css';
import {isComplete, evaluteBoard, findBestMove} from '../../utils/tic-tac-toe-AI';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(null),
            classes: Array(9).fill('hide'),
            disable: false
        }
    }

    updateSquareValue = (index) => {
        if(this.state.board[index]===null && !this.disable){
            let board = this.state.board.slice();
            let classes = this.state.classes.slice();
            board[index] = this.props.current;
            classes[index] = 'show';
            this.props.swap();
            this.setState({
                board,
                classes,
                disable: true
            });
            setTimeout(()=> {
                let value  = evaluteBoard(this.state.board);
                if(isComplete(this.state.board) || value !==0){
                    if(value===0){
                        this.props.setGameState('t');
                    }else{
                        this.props.setGameState(value>0?'o':'x');
                    }
                    this.setState({
                            board: Array(9).fill(null),
                            classes:Array(9).fill('hide'),
                    });
                }
                if(this.props.type==='1' && this.props.current!==this.props.user){
                    this.updateSquareValue(findBestMove(this.state.board, this.props.current==='o'));
                }
                this.setState({
                    disable: false
                });
            },1000);
            
        }       
    }

    renderSquare(pos){
        return (
            <Square disable={this.state.disable} className={this.state.classes[pos]} value={this.state.board[pos]} mark={() => this.updateSquareValue(pos)} />
        )
    }


    render() {
        return (
            <div className={'board'}>
                <div className={'row'}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className={'row'}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className={'row'}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }

}
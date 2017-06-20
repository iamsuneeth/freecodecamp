import React from 'react';
import Square from '../square/square';
import './board.css';
import {isComplete, evaluteBoard, findBestMove} from '../../utils/tic-tac-toe-AI';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(null)
        }
        this.current = props.user
        this.next = props.user === 'x'?'o':'x'
    }

    swap = (current,next)=> {
        this.current = next;
        this.next = current;
    }
    updateSquareValue = (index) => {
        if(this.state.board[index]===null){
            let board = this.state.board
            board[index] = this.current;
            this.swap(this.current, this.next);
            this.setState({
                board
            });
            let value  = evaluteBoard(this.state.board);
            if(isComplete(this.state.board) || value !==0){
                if(value===0){
                    this.props.setGameState('t');
                }else{
                     this.props.setGameState(value>0?'o':'x');
                }
            }
            if(this.props.type==='1' && this.current!==this.props.user){
                this.updateSquareValue(findBestMove(board, this.current==='o'));
            }
        }       
    }

    renderSquare(pos){
        return (
            <Square value={this.state.board[pos]} mark={() => this.updateSquareValue(pos)} />
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
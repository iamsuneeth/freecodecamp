import React from 'react';
import Square from '../square/square';
import './board.css';
import {isComplete, evaluateBoard, findBestMove} from '../../utils/tic-tac-toe-AI';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(null),
            classes: Array(9).fill(''),
            disable: false
        }
    }

    updateSquareValue (index){
        if(this.state.board[index]===null){
            let board = this.state.board.slice();
            let classes = this.state.classes.slice();
            board[index] = this.props.current;
            classes[index] = 'hideSquare';
            this.props.swap(); 
            this.setState({
                classes,
                disable: true
            })
            setTimeout(()=> {
                classes[index] = '';
                this.setState({
                    board,
                    classes
                });
                let value  = evaluateBoard(this.state.board, this.props.user);
                if(isComplete(this.state.board) || value.value !==0){
                    if(value.value===0){
                        this.props.setGameState('t');
                    }else{
                        this.props.setGameState(value.value>0?this.props.next:(this.props.next)==='x'?'o':'x');
                        for(let i=0;i<3;i++){
                            classes[value.indices[i]] = 'highlight';
                        }
                        this.setState({
                            classes
                        });
                    }
                    this.props.showMessages();
                    setTimeout(()=>{
                        this.setState({
                            board: Array(9).fill(null),
                            classes:Array(9).fill(''),
                            disable:false
                        });
                         this.props.hideMessages();
                         if(this.props.type==='1' && this.props.current!==this.props.user){
                            this.updateSquareValue(findBestMove(this.state.board, this.props.current==='o'));
                        }
                    },5000);
                    return;
                }
                if(this.props.type==='1' && this.props.current!==this.props.user){
                    this.updateSquareValue(findBestMove(this.state.board, this.props.current==='o'));
                }else{
                    this.setState({
                       disable: false
                    });
                }
            },(this.props.type==='1' && this.props.current!==this.props.user)?1000:500);
            
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
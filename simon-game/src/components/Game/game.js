import React from 'react';
import propTypes from 'prop-types';
import GameButton from '../GameButton/gamebutton';
import Button from '../basics/button/button';
import './game.css';

const toneMap = {
    1:{tone:"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
        button:1},
    2:{tone:"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
        button:2},
    3:{tone:"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
        button:3},
    4:{tone:"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
        button:4}
}


class Game extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            intervalId:null,
            power: false,
            active:false,
            strict:false,
            step:0,
            playing:false,
            currentSequence:[],
            userSequence:[],
            keysActive:false,
            clickable:false,
            validated:"successNew",
            glow:"",
            error:false,
            success:false
        }
    }

    
    pressButton(user,id,audio){
        if(audio){
            audio.src = toneMap[id].tone;
            audio.play();
        }
        else
            new Audio(toneMap[id].tone).play();
        
        this.setState({
            glow:id+""
        });
        let self = this;
        setTimeout(function() {
            self.setState({
                glow:""
            });
        }, 1000);
        if(this.state.clickable && user){
            this.setState({
                userSequence:[...this.state.userSequence,parseInt(id)]
            });
        }
    }

    startSequencePlay(){
        let self = this;
        let sequence=[];
        let interval = setInterval(function(){

            if(!self.state.power){
                clearInterval(self.state.intervalId);
                self.setState({
                    playing:false,
                    currentSequence:[],
                    active:false,
                    userSequence:[],
                    validated:true,
                    step:0
                });
                return;
            }

            if(self.state.step+1===20){
                clearInterval(self.state.intervalId);
                self.setState({
                    playing:false,
                    currentSequence:[],
                    active:false,
                    userSequence:[],
                    validated:true,
                    error:false,
                    success:true,
                    step:0

                });
                return;
            }
            if(!self.state.playing){
                
                if(self.state.validated==="successNew"){
                    sequence=self.state.currentSequence;
                    sequence.push(Math.floor(Math.random()*(4-1+1)+1));
                }
                self.setState({
                    playing:true
                });

                var audio = new Audio();
                self.pressButton(false,sequence[0],audio);
                let i=0;
                audio.onended = function(){
                    i++;
                    if(i< sequence.length){
                        setTimeout(function(){
                            self.pressButton(false,sequence[i],audio);
                        },1000);
                        
                    }else{
                        
                        self.setState({
                            clickable:true
                        });

                        setTimeout(function(){
                            self.setState({
                                validated:"fail"
                            });
                        },sequence.length*2000);
                    }
                }
            }
            if(self.state.playing && self.state.validated==="fail"){
                self.setState({
                    clickable:false
                });
                if(self.state.currentSequence.length===self.state.userSequence.length){
                    let result=true;
                    for(let j=0;j<self.state.currentSequence.length;j++){
                        if(self.state.currentSequence[j]!==self.state.userSequence[j]){
                            result=false;
                            break;
                        }
                    }
                    if(result){
                        self.setState({
                            playing:false,
                            validated:"successNew",
                            step:self.state.step+=1,
                            userSequence:[]
                        })
                    }else{
                        self.setState({
                            validated:self.state.strict?"successNew":"fail",
                            playing:false,
                            userSequence:[],
                            currentSequence:self.state.strict?[]:self.state.currentSequence,
                            error:true,
                        });

                        let interval = setInterval(function(){
                            self.setState({
                                error:!self.state.error
                            })
                        },300);
    
                        setTimeout(function() {
                            clearInterval(interval);
                            self.setState({
                                error:false
                            })
                        }, 1000);
                    }
                    
       
                }else{
                    
                    self.setState({
                        validated:self.state.strict?"successNew":"success",
                        playing:false,
                        userSequence:[],
                        currentSequence:self.state.strict?[]:self.state.currentSequence,
                        error:true
                    });

                    let interval = setInterval(function(){
                        self.setState({
                            error:!self.state.error
                        })
                    },300);

                    setTimeout(function() {
                        clearInterval(interval);
                        self.setState({
                            error:false
                        })
                    }, 905);
                   
                }
            }

        },2000);
        this.setState({
            intervalId:interval,
            currentSequence:sequence,
            active:true
        });
    }

    render(){
    return (
    <div className="game">
        <div className="gamerow">
            <GameButton id='1' glow={this.state.glow} clickable={this.state.clickable} onClick={this.pressButton.bind(this,true)}/>
            <GameButton id='2' glow={this.state.glow} clickable={this.state.clickable} onClick={this.pressButton.bind(this,true)}/>
        </div>
        <div className="gamerow">
            <GameButton id='3' glow={this.state.glow} clickable={this.state.clickable} onClick={this.pressButton.bind(this,true)}/>
            <GameButton id='4' glow={this.state.glow} clickable={this.state.clickable} onClick={this.pressButton.bind(this,true)}/>
        </div>
        <div className="middle">
        <h2 className="name">SIMON&copy;</h2>
            <div className="control">
            <div className="row">
                <div className="col align-self-center">
                    <label htmlFor="">OFF</label>
                </div>
                <div className="col col-sm-4">
                        <div className="switch-container" onClick={() => this.setState({
                            power:!this.state.power
                        })}>
                            <div className={"switch"+(this.state.power?" on":"")}></div>
                        </div>
                </div>
                <div className="col align-self-center">
                        <label htmlFor="">ON</label>
                </div>
            </div>
                <div className="row">
                    <div className="col">
                        <Button label='START' color={'yellow'} onClick={this.state.power?this.startSequencePlay.bind(this):void(0)}/>
                    </div>
                    <div className="col">
                        <Button label='STRICT' color={'red'} indicator={true} strict={this.state.strict} onClick={() => this.state.power?this.setState({
                            strict:!this.state.strict
                        }):void(0)}/>
                    </div>
                </div>
            </div>
            <div className="count">
                <div className="row display">
                    <div className="col">
                        {!this.state.error && <div className={this.state.active?" active":""}>{(this.state.power && this.state.step+1>0)?(this.state.active)?this.state.step+1:0:'--'}</div>}
                        {this.state.error && <div className={"active"}>ERROR!!</div>}
                        {this.state.success && <div className={"active"}>WINNER!!</div>}
                    </div>
                </div>
                <div className='row'>
                    <label className='label' htmlFor="">COUNT</label>
                </div>
            </div>
        </div>
    </div>

)}
}


export default Game;


import React from 'react';
import propTypes from 'prop-types';
import GameButton from '../GameButton/gamebutton';
import Button from '../basics/button/button';
import {connect} from 'react-redux';
import {
    powerToggle,
    strictToggle,
    start,
    addSequence,
    setSequence,
    setPlayStatus,
    toggleKeys
} from '../../actions';
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
            glow:""
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
                clearInterval(self.state.intervalId)
                self.setState({
                    playing:true,
                    currentSequence:[],
                    active:false,
                    userSequence:[],
                    validated:true
                })
                return;
            }
            console.log(self.state.playing);
            if(!self.state.playing){
                
                if(self.state.validated==="successNew"){
                    sequence=self.state.currentSequence;
                    for(let i=0;i<self.state.step+1;i++)
                        sequence.push(Math.floor(Math.random()*(4-1+1)+1));
                }
                self.setState({
                    playing:true
                });
               /*  sequence.map(function(element,index){
                    if(index+1 === sequence.length){
                        setTimeout(function() {
                            self.pressButton(false,element);
                            setTimeout(function(){
                                self.setState({
                                    validated:"fail"
                                });
                            },sequence.length*2000);
                            self.setState({
                                clickable:true
                            });
                        }, index*1000);
                    }else{
                        self.pressButton(false,element)
                        
                        
                    }
    
                    return true;
                },this); */

                var audio = new Audio();
                self.pressButton(false,sequence[0],audio);
                let i=0;
                audio.onended = function(){
                    i++;
                    if(i< sequence.length){
                        self.pressButton(false,sequence[i],audio);
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
                    console.log("validate");
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
                            userSequence:[],
                            currentSequence:[]
                        })
                    }else{
                        console.log("Invalid Input");
                        self.setState({
                            validated:"fail",
                            playing:true,
                            userSequence:[]
                        });
                    }
                    
                    //clearInterval(self.state.intervalId);                     
                }else{
                    console.log("No/Invalid Input");
                    self.setState({
                        validated:"success",
                        playing:false,
                        userSequence:[]
                    });
                   
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
                        <Button label='Start' onClick={this.state.power?this.startSequencePlay.bind(this):void(0)}/>
                    </div>
                    <div className="col">
                        <Button label='Strict' onClick={() => this.setState({
                            strict:!this.state.strict
                        })}/>
                    </div>
                </div>
            </div>
            <div className="count">
                <div className="row display">
                    <div className="col">
                        <div className={this.state.active?" active":""}>{(this.state.power && this.state.step+1>0)?(this.state.active)?this.state.step+1:0:'--'}</div>
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



const mapStateToProps = state => ({
    power:state.power,
    active:state.active,
    strict:state.strict,
    step:state.step,
    currentSequence:state.currentSequence,
    userSequence:state.userSequence,
    sequenceLoaded:state.sequenceLoaded,
    playing:state.playing
});

const mapDispatchToProps = dispatch => ({
    powerToggle:() => dispatch(powerToggle()),
    strictToggle:() => dispatch(strictToggle()),
    addSequence: id => dispatch(addSequence(id)),
    start:() => dispatch(start()),
    setSequence:(seq) => dispatch(setSequence(seq)),
    setPlayStatus:(status) => dispatch(setPlayStatus(status)),
    toggleKeys:() => dispatch(toggleKeys())
})

export default connect(mapStateToProps,mapDispatchToProps)(Game);

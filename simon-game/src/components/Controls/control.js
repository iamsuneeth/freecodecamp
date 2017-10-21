import React from 'react';
import propTypes from 'prop-types';
import Switch from '../basics/switch/switch';
import Button from '../basics/button/button';
import {connect} from 'react-redux';
import {
    powerToggle,
    strictToggle,
    start,
    setSequence,
    setPlayStatus,
    toggleKeys
} from '../../actions';
import './control.css';

const toneMap = {
    1:{tone:"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
        button:"red"},
    2:{tone:"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
        button:"yellow"},
    3:{tone:"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
        button:"blue"},
    4:{tone:"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
        button:"green"}
}

class ControlContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            intervalId:null,

        }
    }

    componentWillReceiveProps(nextprops){
        if(nextprops.active && !nextprops.playing){
            console.log("Starting to play")
            let sequence = [];
            for(let i=0;i<nextprops.step;i++)
                sequence.push(Math.floor(Math.random()*(4-1+1)+1));
            this.startPlaying(sequence);
            
        }
    }

    errorCheck(){
        if(this.props.userSequence.length===this.props.currentSequence.length){
            console.log(this.props.userSequence, this.props.currentSequence);
            console.log("validate");
        }else{
            console.log("error");
            //play error tone
            if(this.props.active){
            setTimeout(function() {
                this.startPlaying(this.props.currentSequence); 
            }.bind(this), 1000);
            }
        }
    }

    startPlaying(sequence){
        console.log(sequence);
        console.log("hi, i'm playing sequence ",sequence);
        this.props.setPlayStatus(true);
        this.props.setSequence(sequence);
        this.playAndGlow(sequence,0);
        //playAndGlow(sequence,0);
       
    
    }

    playAndGlow(sequence,i){
        let audio = new Audio();
        let tone = toneMap[sequence[i]].tone;
        let button = toneMap[sequence[i]].button;
        audio.src = tone;
        audio.play();
        audio.onended = setTimeout(function(i) {
            console.log(i,sequence.length);
            if(i<sequence.length){
                this.playAndGlow(sequence,i);
            }else{
                this.props.setPlayStatus(false);
                this.props.toggleKeys(true);
                setTimeout(function(){
                    this.errorCheck();
                }.bind(this),sequence.length*5000);
            }
            console.log("ended sequence "+sequence[i-1]);
        }.bind(this),sequence.length*5000,++i);
    
        
    }
   
    render() {
        return (
            <div className="control">
                <Switch power={this.props.power} onClick={this.props.powerToggle}/>
                <div className="row">
                    <div className="col">
                        <Button label='Start' onClick={this.props.power?this.props.start:void(0)}/>
                    </div>
                    <div className="col">
                        <Button label='Strict' onClick={this.props.strictToggle}/>
                    </div>
                </div>
            </div>
            )
    }
    
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
    start:() => dispatch(start()),
    setSequence:(seq) => dispatch(setSequence(seq)),
    setPlayStatus:(status) => dispatch(setPlayStatus(status)),
    toggleKeys:() => dispatch(toggleKeys())
})

export default connect(mapStateToProps,mapDispatchToProps)(ControlContainer);


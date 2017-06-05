import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      session:{
        hrs:0,
        mints:25,
        secs:0
      },
      breakfor:{
        hrs:0,
        mints:5,
        sesc:0
      },
      interval:null,
      isPaused:false,
      currentTime:25*60,
      active:false
    }
    this.sessionSettings = 25;
    this.breakforSettings = 5;
    this.session = true;
  }

  componentDidMount() {
    document.getElementById('bar').style.strokeDashoffset = 2*Math.PI*parseInt(document.getElementById('bar').getAttribute('r'),10);
  }
  startSession = () => {
    if(this.state.isPaused){
      clearInterval(this.state.interval);
      this.setState({
      active:false
    })
    }
    let hrs,mints,secs,stroke;
    this.setState({
      active:true
    })
    let _interval = setInterval(() => {
      if(!this.state.isPaused){
        if(this.state.currentTime <= 0){
        if(this.session){
          let alarm = new Audio('https://notificationsounds.com/wake-up-tones/alarm-buzzer-407/download/mp3');
          alarm.play();
          this.setState({
            currentTime : this.breakforSettings*60
          });
          document.getElementById('bar').style.stroke = '#ff3200';
        }else{
          this.setState({
            currentTime : this.sessionSettings*60
          });
          document.getElementById('bar').style.stroke = '#10ff00';
        }
        this.session=!this.session;
        }
        --this.state.currentTime;
        stroke = this.state.currentTime/(this.session?this.sessionSettings*60:this.breakforSettings*60)*2*Math.PI*parseInt(document.getElementById('bar').getAttribute('r'),10);
        document.getElementById('bar').style.strokeDashoffset = stroke;
        hrs = parseInt(this.state.currentTime/3600,10);
        mints = parseInt((this.state.currentTime%3600)/60,10);
        secs = parseInt(this.state.currentTime%60,10);
        console.log(mints,':',secs)
        if(this.session){
          this.setState({
          session:{
            hrs:hrs,
            mints:mints,
            secs:secs
          }
        });
        }else{
          this.setState({
          breakfor:{
            hrs:hrs,
            mints:mints,
            secs:secs
          }
        });
        }             
       }
       },1000);
      this.setState({
        interval:_interval
      }); 

    }
  
  resetSession = () => {
    clearInterval(this.state.interval);
    this.session=true;
    this.setState({
      session:{
        hrs:0,
        mints:this.sessionSettings,
        secs:0
      },
      breakfor:{
        hrs:0,
        mints:this.breakforSettings,
        secs:0
      },
      currentTime:this.sessionSettings*60,
      active:false,
      isPaused:false
    });
    document.getElementById('bar').style.stroke = '#10ff00';
    document.getElementById('bar').style.strokeDashoffset = 2*Math.PI*parseInt(document.getElementById('bar').getAttribute('r'),10);
  }
  pauseSession = () => {
    this.setState({
      isPaused:!this.state.isPaused
    })
  }
  alterSession = (value) => {
    this.sessionSettings += value;
    this.setState({
      session:{
        hrs:0,
        mints:this.sessionSettings,
        secs:0
      }
    });
    this.setState({
      currentTime: this.sessionSettings*60
    });
  }
  alterBreak = (value) => {
    this.breakforSettings += value;
    this.setState({
      breakfor:{
        hrs:0,
        mints:this.breakforSettings,
        secs:0
      }
    });
    
  }

  toggleSession = () => {
    if(!this.state.active){
      this.startSession();
    }else{
      this.resetSession();
    }
  }
  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>POMODORO CLOCK</h2>
        </div>
        <div className="App-intro container">
          <div className="values row">
            <div className="col col-lg-offset-3 col-lg-6">
              <div className="row">
                <div className="col col-lg-4"><span className="counterLabel">BREAK LENGTH</span></div>
                <div className="col col-lg-4"><span className="counterLabel"></span></div>
                <div className="col col-lg-4"><span className="counterLabel">SESSION LENGTH</span></div>
                <div className="col col-lg-4"><button className="btn counter" disabled={this.breakforSettings===0?true:false} onClick={this.alterBreak.bind(this,-1)}>-</button><span className="content">{this.breakforSettings}</span><button className="btn counter" onClick={this.alterBreak.bind(this,1)}>+</button></div>
                <div className="col col-lg-4"><span className="break">{this.session?'':'Take a Break!'}</span></div>
                <div className="col col-lg-4"><button className="btn counter" disabled={this.sessionSettings===0||this.sessionSettings===50?true:false} onClick={this.alterSession.bind(this,-1)}>-</button><span className="content">{this.sessionSettings}</span><button className="btn counter" onClick={this.alterSession.bind(this,1)}>+</button></div>
              </div>
            </div>
          </div>
          <div className="clock row text-center">
            <div className="col col-lg-offset-3 col-lg-6">
              <div id="cont" data-ptt={this.session?((this.state.session.hrs===0?'':this.state.session.hrs+' : ')+this.state.session.mints +' : '+ this.state.session.secs+ (this.state.session.secs===0?this.state.session.secs:'')):((this.state.breakfor.hrs===0?'':this.state.breakfor.hrs+' : ')+this.state.breakfor.mints +' : '+ this.state.breakfor.secs+ (this.state.breakfor.secs===0?this.state.breakfor.secs:''))}>
              <svg id="svg" viewBox="0 0 400 400"  version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle r="180" cx="200" cy="200" fill="transparent" strokeDasharray="1130.96" strokeDashoffset="0"></circle>
                <circle id="bar" r="180" cx="200" cy="200" fill="transparent" strokeDasharray="1130.96" ></circle>
              </svg>
            </div>
            </div>
          </div>
          <div className="group">
            <button className="btn btn-default" onClick={this.toggleSession}>{this.state.active?'Stop':'Start'}</button>
            <button className="btn btn-default" disabled={!this.state.active} onClick={this.pauseSession}>{this.state.isPaused?'Resume':'Pause'}</button>
          </div>
        </div>
      </div>
    );
  }
}


export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';

const activeStyle = {
  backgroundColor: 'orange',
  marginTop: 10,
  boxShadow: "3px 3px 5px black",
  width:'80px',
  height: '80px'
}

const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10,
  boxShadow: "3px 3px 5px black",
  width:'80px',
  height: '80px'
}

const drum_pads = [{
  name:"Q",
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},{
  name:"W",
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'},{
  name:"E",
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'},{
  name:"A",
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'},{
  name:"S",
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'},{
  name:"D",
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},{
  name:"Z",
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},{
  name:"X",
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'},{ 
  name:"C",
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'}];

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayText:'DRUM PAD'
    }

    this.handleClick=this.handleClick.bind(this);
    this.handleKeyPress=this.handleKeyPress.bind(this);
  }

  playAudio(url){
    var audio = new Audio(url);
    audio.play();
  }

  handleClick(e){

    this.setState({
      displayText:e.id
    });
    this.playAudio(e.url);
    document.getElementById(e.id).style.backgroundColor = 'orange';
    setTimeout(()=>document.getElementById(e.id).style.backgroundColor = 'grey',110);
    
  }

  handleKeyPress(e){
    var validKeys = drum_pads.map((val)=>val.name);
    var pressedKey = e.key.toUpperCase()
    if(validKeys.indexOf(pressedKey) !== -1){
      var keyObject = drum_pads[validKeys.indexOf(pressedKey)];
      this.setState({
        displayText:keyObject.id
      });
      this.playAudio(keyObject.url);
      document.getElementById(keyObject.id).style.backgroundColor = 'orange';
      setTimeout(()=>document.getElementById(keyObject.id).style.backgroundColor = 'grey',110);
    }

  }

  componentDidMount() {

    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render(){
    return (
      <div id="drum-machine">
        <h1>React Drum Pad</h1>
        <div id="display">{this.state.displayText}</div><br/>
        {drum_pads.map((value)=>{
          return <DrumPad key={value.id} value={value} click={this.handleClick} keyPress={this.handleKeyPress}></DrumPad>
        })}

      </div>
    );
  }
}

const DrumPad = (props)=>{
    return (
      <button className="drum-pad" id={props.value.id} style={inactiveStyle}
      onClick={()=>props.click({url:props.value.url, id:props.value.id})} > {props.value.name}
      <audio className="clip" src={props.value.url} id={props.value.name}></audio>
      </button>);
}

export default App;

import React, { Component } from 'react';


import { backOne } from './backOne.json';
import { backTwo } from './backTwo.json';

console.log(backOne)
class Pruebas extends Component {
constructor(props) {
  super(props);
  this.state = {
    estado : backOne,
    url : '',
    id:'',
    power: true,
    powerSignal: 'on',
    bank: 1
  };

this.obtenerValor = this.obtenerValor.bind(this);
this.playSound = this.playSound.bind(this);
this.encendido = this.encendido.bind(this);
this.bank = this.bank.bind(this);
this.handleKeyPress = this.handleKeyPress.bind(this);
}

componentDidMount() {
  document.addEventListener('keydown', this.handleKeyPress);
}

handleKeyPress(e) {
  if(this.state.power === true){
      let valorDrumPad = this.state.estado.filter(i => i.keyCode === e.keyCode)
      this.setState({
        url: valorDrumPad[0].url,
        id: valorDrumPad[0].id 
      });
      this.playSound()
   
 }
}

bank(){
  if(this.state.estado === backOne){
    this.setState({
      estado: backTwo,
      bank: 2
    });
  } else {
    this.setState({
      estado: backOne,
      bank: 1
    });
  }
}

obtenerValor(e){
  console.log(e)
  if(this.state.power === true){
      let valorDrumPad = this.state.estado.filter(i => i.keyTrigger === e.target.value)
      this.setState({
        url: valorDrumPad[0].url,
        id: valorDrumPad[0].id 
      });

      this.playSound()
    }
}

playSound(){
  const audio = new Audio();
  audio.src = this.state.url

  audio.currentTime = 0;
    audio.play()

}

encendido(){
  if(this.state.power === true){
    this.setState({
      power: false,
      powerSignal:'off'
    });
  } else {
    this.setState({
      power: true,
      powerSignal:'on'
    });
  }
}

    render() {
        return (
            <div className="container d-flex flex-row">
              <div className="drum-pad">
                  <button className='btn ' name="Q" value="Q" onClick={this.obtenerValor}> Q </button>
                  <button className='btn ' name="W" value="W" onClick={this.obtenerValor}> W </button>
                  <button className='btn ' name="E" value="E" onClick={this.obtenerValor}> E </button>
                  <button className='btn ' name="A" value="A" onClick={this.obtenerValor}> A </button>
                  <button className='btn ' name="S" value="S" onClick={this.obtenerValor}> S </button>
                  <button className='btn ' name="D" value="D" onClick={this.obtenerValor}> D </button>
                  <button className='btn ' name="Z" value="Z" onClick={this.obtenerValor}> Z </button>
                  <button className='btn ' name="X" value="X" onClick={this.obtenerValor}> X </button>
                  <button className='btn ' name="C" value="C" onClick={this.obtenerValor}> Y </button>
              </div>
              <div className="drum-control d-flex flex-column">
                
              <p className="display">{this.state.id}</p>
              <button name="power" value="power" onClick={this.encendido} className="control"> {this.state.powerSignal} </button>
              <button name="bank" value="bank" onClick={this.bank} className="control"> Bank {this.state.bank} </button>
              </div>  
            </div>
        );
    }
}

export default Pruebas;
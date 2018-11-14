import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { withAuth } from '../lib/authContext';
import speechService from '../lib/speech-service';
import SpeechRecognition from 'react-speech-recognition';

class FormAdd extends Component {
  state = {
    title: '',
    message: '',
    tag: '',
    is_Public: 'false',
    owner: this.props.user._id,
    isLoading: true,
    is_Text: false,
    is_Audio: false,
    my_transcript: '',
    btn_Start: false,
    btn_Stop: true,
    alert: '',
}

componentDidMount = () => {
  this.props.resetTranscript();
}

componentDidUpdate = (prevprops, state) => {
  if (this.props.id !== prevprops.id){
    this.setState({
      is_Public: this.props.is_Public
    })
  }
}

handleTextArea = (event) => {
  this.setState({
    [event.target.name]: event.target.value,
    my_transcript: this.props.finalTranscript
  })
}

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      my_transcript: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, message, tag, is_Public, owner,my_transcript, is_Text,is_Audio } = this.state;
    let finalMessage ='';
    if (is_Text){
      finalMessage = message
    }
    if (is_Audio){
      finalMessage = this.props.finalTranscript
    }


    let arrayTag = []
    arrayTag.push(tag);
      speechService.addSpeech({
      title: title,
      // message: my_transcript,
      message: finalMessage,
      tag: tag,
      is_Public: is_Public,
      owner,
    })
    .then(() => {
      console.log('ha llegado aquí: handleSubmit')
      this.setState({
        title: '',
        message: '',
        tag: '',
        is_Public: 'false',
        alert: '',
        my_transcript: ''
      })
      this.setState({
        isLoading: false,
      })
      this.props.history.push('/profile/speeches');
    })
    .catch( error => {
      const { data } = error.response;

      if (data.error === 'Fields cannot be empty') {
        this.setState({
          alert: 'Fields cannot be empty'
        })
      }
    })
  }

  // Activa el formulario Texto
  handleActivateText = () => {
    this.setState({
      is_Text: true,
      is_Audio: false
    })
  }
  // Activa el formulario Audio
  handleActivateAudio = () => {
   this.setState({
    is_Audio: true, 
    is_Text: false,
   })
 }

 //Activa la escucha y bloquea el botón de Start
 handleStartListening = () => {
  this.setState({
    btn_Start:true,
    btn_Stop: false
   })
  this.props.startListening();
 }

  //Desactiva la escucha y bloquea el botón de Stop and Reset
 handleStopListening = () => {
  this.setState({
    btn_Start: false,
    btn_Stop: true
   })
  this.props.stopListening();
 }

 // Reinicia la escucha borrando el contenido.
 handleResetTranscript = () => {
  this.props.resetTranscript();
 }


  render() {
    // Configuración Inicial de react-speech-recognition
    const {message, is_Text, is_Audio, btn_Start, btn_Stop, alert} = this.state;
    let { finalTranscript, transcript, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening,recognition } = this.props
    
    recognition.lang = 'es-ES';

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div>
          {/* Botones que activan los formularios Audio/Text */}
        <button onClick={this.handleActivateAudio}>Use Audio</button>
        <button onClick={this.handleActivateText}>Use Text</button>
        { alert ? <h1>{alert}</h1> : <div></div>}

          {/* Formulario de Texto */}
        {is_Text ? 
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>Title: <input type="text" name="title" placeholder="title" onChange={this.handleInput}></input></div>
            <div>Message: <textarea className="text-area-form" rows="20" cols="43" name="message" placeholder="message" value={message} onChange={this.handleInput}></textarea></div>
            <div>Tag: <input type="text" name="tag" placeholder="tag" onChange={this.handleInput}></input></div>
            
            <div className="radio">Public:
              <input type="radio" id="is_Public" name="is_Public" value="true" required onClick={this.handleInput}/></div>
            <div className="radio">Private:
              <input type="radio" id="is_not_Public" name="is_Public" value="false" onClick={this.handleInput}/></div>

            
            <div><input type="submit" value="Submit speech" /></div>
          </form>
        </div>
         : <React.Fragment> </React.Fragment> 
      }
        {/* Formulario de Audio */}
       {is_Audio ? 
        <div> <h2>Audio</h2>
            <button disabled={btn_Start} onClick={this.handleStartListening}>Start</button>
             <button disabled={btn_Stop} onClick={this.handleStopListening}>Stop</button>
             <button disabled={btn_Start} onClick={this.handleResetTranscript}>Reset</button>
             <span>{transcript}</span>
          <form onSubmit={this.handleSubmit}>
            <div>Title: <input type="text" name="title" placeholder="title" onChange={this.handleInput}></input></div>
            <div>Message: <textarea className="text-area-form" rows="20" cols="43" name="message" placeholder="message" value={transcript} onFocus={this.handleTextArea} onChange={this.handleTextArea}></textarea></div>
            <div>Tag: <input type="text" name="tag" placeholder="tag" onChange={this.handleInput}></input></div>
            
            <div className="radio">Public:
              <input type="radio" id="is_Public" name="is_Public" value="true" required onClick={this.handleInput}/></div>
            <div className="radio">Private:
              <input type="radio" id="is_not_Public" name="is_Public" value="false" onClick={this.handleInput}/></div>

            
            <div><input type="submit" value="Submit speech" /></div>
          </form>
        </div>
         : <React.Fragment> </React.Fragment> 
      }



      </div>

      

    )
  }
}
const options = {
  autoStart: false,
  finalTranscript:''
  
}
export default  SpeechRecognition(options)(withRouter(withAuth(FormAdd)));
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
    language: 'es-ES'
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

  handleDropDown = (event) => {
    this.setState({
      [event.target.selectedIndex]: event.target.selectedIndex,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, message, tag, is_Public, owner,my_transcript, is_Text,is_Audio, language} = this.state;
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
      language,
    })
    .then(() => {
      console.log('ha llegado aquí: handleSubmit')
      this.setState({
        title: '',
        message: '',
        tag: '',
        is_Public: 'false',
        alert: '',
        my_transcript: '',
        language: ''
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
    const {message, is_Text, is_Audio, btn_Start, btn_Stop, alert, language} = this.state;
    let { finalTranscript, transcript, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening,recognition } = this.props
    
    // recognition.lang = language;
    recognition.lang = 'es-ES';

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div>
          {/* Botones que activan los formularios Audio/Text */}
        <button  className="rec-buttons-launcher-audio btn-size-input-small" onClick={this.handleActivateAudio}>Audio</button>
        <button  className="rec-buttons-launcher-text btn-size-input-small" onClick={this.handleActivateText}>Text</button>
        { alert ? <h1 className="alert-warning">{alert}</h1> : <div></div>}

          {/* Formulario de Texto */}
        {is_Text ? 
        <div>
          <div className="form-layout"><h2>Text</h2></div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-layout">
              <h3>Title:</h3>
              <input className="form-input" autoFocus id="title-text" type="text" name="title" placeholder="title" onChange={this.handleInput}></input>
            </div>
            <div className="form-layout">
              <h3>Message:</h3>
              <textarea className="textarea-area-form" rows="10" cols="43" name="message" placeholder="message" value={message} onChange={this.handleInput}></textarea>
            </div>
            <div className="form-layout">
              <h3>Tag:</h3>
              <input className="form-input" type="text" name="tag" placeholder="tag" onChange={this.handleInput}></input>
            </div>
            <div className="top-margin">
                <div className="form-layout">
                  <div className="radio">Public:
                    <input type="radio" id="is_Public" name="is_Public" value="true" required onClick={this.handleInput}/></div>
                  <div className="radio">Private:
                    <input type="radio" id="is_not_Public" name="is_Public" value="false" onClick={this.handleInput}/></div>
                </div>
            </div>
            
            <div className="submit-button-container bottom-margin"><button className="material-button-input rippler-container btn-size-input" type="submit" value="Submit speech">Submit</button></div>
          </form>
        </div>
         : <React.Fragment> </React.Fragment> 
      }
        {/* Formulario de Audio */}
       {is_Audio ? 
        <div> 
          <div className="form-layout"><h2>Audio</h2></div>
            <button className="rec-buttons btn-size-input-small" disabled={btn_Start} onClick={this.handleStartListening}>Start</button>
             <button className="rec-buttons btn-size-input-small" disabled={btn_Stop} onClick={this.handleStopListening}>Stop</button>
             <button className="rec-buttons btn-size-input-small" disabled={btn_Start} onClick={this.handleResetTranscript}>Reset</button>
          <form onSubmit={this.handleSubmit}>
            <div className="form-layout">
              <h3>Title:</h3>
              <input className="form-input" autoFocus id="title-audio" type="text" name="title" placeholder="title" onChange={this.handleInput}></input>
            </div>
            <div className="form-layout">
              <h3>Message:</h3>
              <textarea className="textarea-area-form" rows="20" cols="43" name="message" placeholder="message" value={transcript} onFocus={this.handleTextArea} onChange={this.handleTextArea}></textarea>
            </div>
            <div className="form-layout">
              <h3>Tag:</h3>
              <input  className="form-input" type="text" name="tag" placeholder="tag" onChange={this.handleInput}></input>
            </div>
            <div className="top-margin">
              <div className="form-layout">
                <div className="radio">Public:
                  <input type="radio" id="is_Public" name="is_Public" value="true" required onClick={this.handleInput}/></div>
                <div className="radio">Private:
                  <input type="radio" id="is_not_Public" name="is_Public" value="false" onClick={this.handleInput}/></div>
              </div>
            </div>
            
            <div className="submit-button-container bottom-margin"><button className="material-button-input rippler-container btn-size-input" type="submit" value="Submit speech">Submit Speech</button></div>
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
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { withAuth } from '../lib/authContext';
import speechService from '../lib/speech-service';
import SpeechRecognition from 'react-speech-recognition';
import SpeechAPI from '../components/SpeechAPI';





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
    btn_Stop: true

  }

componentDidUpdate = (prevprops, state) => {
  if (this.props.id !== prevprops.id){
    this.setState({
      is_Public: this.props.is_Public
    })
  }
}

handleTextArea = (event) => {
  // console.log(this.props.transcript.value);
  this.setState({
    [event.target.name]: event.target.value,
    my_transcript: this.props.finalTranscript
  })
  console.log('Transcript: ',this.props.finalTranscript.concat(' '));

}

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      my_transcript: event.target.value
    })

  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, message, tag, is_Public, owner,my_transcript } = this.state;
    // const {finalTranscript} = this.props;
    let arrayTag = []
    arrayTag.push(tag);
    // console.log(this.props.finalTranscript);
      speechService.addSpeech({
      title: title,
      // message: my_transcript,
      message: this.props.finalTranscript,
      tag: tag,
      is_Public: is_Public,
      owner
    })
    .then(() => {
      console.log('ha llegado aquí: handleSubmit')
      this.setState({
        title: '',
        message: '',
        tag: '',
        is_Public: 'false',
      })
      this.setState({
        isLoading: false,
      })
      this.props.history.push('/profile/speeches');
    })
  }

  handleActivateText = () => {
    this.setState({
      is_Text: true,
      is_Audio: false
    })
  }
  handleActivateAudio = () => {
   this.setState({
    is_Audio: true, 
    is_Text: false,
   })
 }

 handleStart = () => {
   this.setState({
    btn_Start:true
   })
 }
    
  render() {
    const {message, is_Text, is_Audio, btn_Start} = this.state;
    let { finalTranscript, transcript, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening,recognition } = this.props
    
    recognition.lang = 'es-ES';

    if (!browserSupportsSpeechRecognition) {
      return null
    }


    return (
      <div>
        <button onClick={this.handleActivateAudio}>Use Audio</button>
        <button onClick={this.handleActivateText}>Use Text</button>

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

       {is_Audio ? 
        <div> <h2>Audio</h2>
            <button disabled={false} onChange={this.handleStart} onClick={startListening}>Start</button>
             <button disabled={btn_Start} onClick={stopListening}>Stop</button>
             <button onClick={resetTranscript}>Reset</button>
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
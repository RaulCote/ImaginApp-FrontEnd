import React, {Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

class SpeechAPI extends Component {
  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening,recognition } = this.props
    
    recognition.lang = 'es-ES';

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div>
        <button onClick={startListening}>Start</button>
        <button onClick={stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <span>{transcript}</span>
      </div>
    )
  }
}

const options = {
  autoStart: false,
  
}

export default SpeechRecognition(options)(SpeechAPI)
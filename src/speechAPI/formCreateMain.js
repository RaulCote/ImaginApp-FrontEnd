export function init(){

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  var recognizing;
  var recognition = new SpeechRecognition();
  // var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  // var recognition = new SpeechRecognition();
  console.log("entra");
  var pepito = '';
  // recognition.grammars = speechRecognitionList;
  recognition.lang = 'es-ES';
  recognition.interimResults = false;
  recognition.maxAlternatives = 10;
  recognition.continuous = true;
  reset();
  recognition.onend = reset;

  recognition.onresult = function (event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        textarea.value += event.results[i][0].transcript;
        pepito += event.results[i][0].transcript;
      }
    }
  }
  
}
export function reset() {
    recognizing = false;
    button.innerHTML = "Click to Speak";
  }

  export function toggleStartStop() {
    if (recognizing) {
      recognition.stop();
      reset();
      console.log(typeof pepito);
    } else {
      recognition.start();
      recognizing = true;
      button.innerHTML = "Click to Stop";
    }
  }
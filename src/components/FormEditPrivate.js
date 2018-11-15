import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import speechService from '../lib/speech-service';


class FormEditPrivate extends Component {
  state = {
    title: this.props.speech.title,
    message: this.props.speech.message,
    tag: this.props.speech.tag[0],
    is_Public: this.props.speech.is_Public,
    owner: this.props.user._id,
    checked: !(this.props.speech.is_Public),
    language: this.props.speech.language,

  }

  componentDidMount(){
    this.setState({
      title: this.props.speech.title,
      message: this.props.speech.message,
      tag: this.props.speech.tag,
      is_Public: this.props.speech.is_Public,
      owner: this.props.user._id,
      checked: this.props.speech.is_Public,
      language: this.props.speech.language,
    })
  }

  handleInputTexarea = (event,transcript) => {
    this.setState({
      [event.target.name]: event.target.value.concat(transcript),
    })
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleRadioButton = (event) => {
    const helper = this.helperIsPublic(event.target.value);
    
    this.setState({
      is_Public: helper,
    })    
  }

  helperIsPublic = (is_Public) => {

    return is_Public === 'true' ? true : false;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, message, tag, is_Public, owner, checked , language} = this.state;

    let arrayTag = []
    arrayTag.push(tag);
      speechService.getEditSpeechId(this.props.speech._id,{
      title: title,
      message: message,
      tag: tag,
      is_Public: is_Public,
      owner,
      checked,
      language
    })
    .then(() => {
      this.setState({
        title: '',
        message: '',
        tag: '',
        is_Public: false,
        language: 'es-ES'
      })
    })
  }
    
  render() {
    let equal = false;
    if (this.props.user._id === this.props.speech.owner){
      equal = true;
    } 
    const {title,tag, message, language} = this.state;
    
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-layout">
          <div><p>{language}</p></div>
            <h3>Title:</h3>
            <input className="form-input" type="text" disabled={!equal} name="title" placeholder="title" value={title} onChange={this.handleInput}></input>
          </div>
          <div className="form-layout">
            <h3>Message:</h3>
            <div>
              <textarea className="textarea-area-form" rows="10" cols="43" name="message"  disabled={!equal} placeholder="message" value={message} onChange={this.handleInput}>
              </textarea>
            </div>
          </div>
          <div className="form-layout">
            <h3>Tag:</h3>
            <input className="form-input" type="text"  disabled={!equal} name="tag" placeholder="tag" value={tag} onChange={this.handleInput}></input>
          </div>   
        </form>
      </React.Fragment>
       
    )
  }
}

export default  withAuth(FormEditPrivate);
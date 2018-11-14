import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import speechService from '../lib/speech-service';



class FormEdit extends Component {
  state = {
    title: this.props.speech.title,
    message: this.props.speech.message,
    tag: this.props.speech.tag[0],
    is_Public: this.props.speech.is_Public,
    owner: this.props.user._id,
    checked: !(this.props.speech.is_Public),
    alert: ''
  }

  componentDidMount(){
    this.setState({
      title: this.props.speech.title,
      message: this.props.speech.message,
      tag: this.props.speech.tag,
      is_Public: this.props.speech.is_Public,
      owner: this.props.user._id,
      checked: this.props.speech.is_Public,
    })
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleRadioButton = (event) => {
    const {is_Public} = this.state;
    // console.log('tipo public', typeof is_Public);
    const helper = this.helperIsPublic(event.target.value);
    // console.log('tipo de helper' ,typeof helper);
    // console.log('helper ',helper);
    this.setState({
      is_Public: helper,
    })

    
  }

  helperIsPublic = (is_Public) => {

    // console.log(is_Public)

    return is_Public === 'true' ? true : false;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, message, tag, is_Public, owner, checked } = this.state;
    // console.log('tipo id', typeof this.props.speech._id);


    let arrayTag = []
    arrayTag.push(tag);
      speechService.getEditSpeechId(this.props.speech._id,{
      title: title,
      message: message,
      tag: tag,
      is_Public: is_Public,// === 'true' ? true : false, //this.helperIsPublic(is_Public),
      owner,
      checked
    })
    .then(() => {
      console.log('ha llegado a Edit: handleSubmit')
      this.setState({
        title: '',
        message: '',
        tag: '',
        is_Public: false,
        alert: ''
      })
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
    
  render() {
    let equal = false;
    if (this.props.user._id === this.props.speech.owner){
      equal = true;
    } 
    const {title,tag, message, alert} = this.state;
    let {is_Public} = this.state;
    

    return (
      <React.Fragment>      
         { alert ? <h1 className="alert-warning">{alert}</h1> : <div></div>}
        <form onSubmit={this.handleSubmit}>
          <div className="form-layout">
            <h3>Title:</h3> 
            <input className="form-input" type="text" disabled={!equal} name="title" placeholder="title" value={title} onChange={this.handleInput}></input>
          </div>
          <div className="form-layout">
            <h3>Message:</h3> 
            <textarea className="textarea-area-form" rows="10" cols="43" name="message"  disabled={!equal} placeholder="message" value={message} onChange={this.handleInput}>
            </textarea>
          </div>
          <div className="form-layout">
            <h3>Tag:</h3> 
            <input  className="form-input" type="text" disabled={!equal} name="tag" placeholder="tag" value={tag} onChange={this.handleInput}></input>
          </div>
          <div className="radio-margins">
          { is_Public ? <div className="form-layout">
            <div className="radio">Public: 
              <input 
                type="radio"  
                value={true}
                name="is_Public" 
                required 
                checked={true}
                onChange={this.handleRadioButton} /></div>
            <div className="radio">Private:
              <input 
                type="radio" 
                value={false}
                name="is_Public"
                checked={false}   
                onChange={this.handleRadioButton} /></div> 
            </div>:
               <div className="form-layout"> <div className="radio">Public: 
              <input 
                type="radio" 
                value={true} 
                name="is_Public"  
                required 
                checked={false}
                onChange={this.handleRadioButton} /></div>
            <div className="radio">Private:
              <input 
                type="radio"  
                value={false} 
                name="is_Public"  
                checked={true}
                onChange={this.handleRadioButton} /></div> 
            
              </div>
            } 
            </div>
          { equal ? <div className="submit-button-container bottom-margin"><button className="material-button-input rippler-container btn-size-input" type="submit" value="Save speech">Submit</button></div>: <React.Fragment> </React.Fragment>}
        </form>
      </React.Fragment>
       
    )
  }
}


export default  withAuth(FormEdit);
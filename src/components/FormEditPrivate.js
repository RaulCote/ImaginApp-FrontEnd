import React, { Component } from 'react'
import { withAuth } from '../lib/authContext';
import speechService from '../lib/speech-service';
import SpeechRecognition from 'react-speech-recognition';



class FormEditPrivate extends Component {
  state = {
    title: this.props.speech.title,
    message: this.props.speech.message,
    tag: this.props.speech.tag[0],
    is_Public: this.props.speech.is_Public,
    owner: this.props.user._id,
    checked: !(this.props.speech.is_Public),
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
    console.log('Is public peta', this.props.speech.is_Public)
  }

  // static getDerivedStateFromProps(nextProps,prevState) {
  //   if (nextProps.is_Public !== prevState.is_Public) {
  //       return {is_Public: nextProps.is_Public}
  //   }else{
  //      return null;     
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevProps.is_Public!==this.props.is_Public){
  //     //Perform some operation here
  //     this.setState({is_Public: this.props.is_Public});
  //     this.classMethod();
  //   }

  //   }
   
   //https://hackernoon.com/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607

//   componentDidUpdate = (prevprops, state) => {
//   if (this.props.is_Public !== prevprops.is_Public){
//     this.setState({
//       is_Public: this.props.is_Public,
//       checked: this.props.is_Public
//     })
//   }
// }


  handleInputTexarea = (event,transcript) => {
    console.log(transcript);
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
    const {is_Public} = this.state;
    // console.log('tipo public', typeof is_Public);
    const helper = this.helperIsPublic(event.target.value);
    // console.log('tipo de helper' ,typeof helper);
    // console.log('helper ',helper);
    this.setState({
      is_Public: helper,
    })
    // console.log('despues', is_Public);
    
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
      })
    })
  }
    
  render() {
    let equal = false;
    if (this.props.user._id === this.props.speech.owner){
      equal = true;
    } 
    const {title,tag, message} = this.state;
    let {is_Public, checked} = this.state;
    

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-layout">
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
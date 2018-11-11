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

  static componentWillReceiveProps(nextProps) {
    if (nextProps.is_Public !== this.props.is_Public) {
        return {is_Public: nextProps.is_Public}
    }else{
       return null;     
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.is_Public!==this.props.is_Public){
      //Perform some operation here
      this.setState({is_Public: prevProps.is_Public});
      this.classMethod();
    }

    }
   
   //https://hackernoon.com/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607

//   componentDidUpdate = (prevprops, state) => {
//   if (this.props.is_Public !== prevprops.is_Public){
//     this.setState({
//       is_Public: this.props.is_Public,
//       checked: this.props.is_Public
//     })
//   }
// }


  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleRadioButton = (event) => {
    console.log(event.target.value);
    const helper = this.helperIsPublic(event.target.value);
    console.log('helper ',helper);
    this.setState({
      [event.target.name]: event.target.value,
    })
    console.log(event.target.value);
    
  }

  helperIsPublic = (is_Public) => {

    console.log(is_Public)

    return is_Public === 'true' ? true : false;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, message, tag, is_Public, owner, checked } = this.state;
    
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
    
    const { selectedIndex } = this.state;

    // if (is_Public === false){
      
    //   checked = !checked;
    //   is_Public = !is_Public;
    // }
    // console.log(checked);
    return (
      <div>
        <form  onSubmit={this.handleSubmit}>
          <div>Title: <input type="text" disabled={!equal} name="title" placeholder="title" value={title} onChange={this.handleInput}></input></div>
          <div>Message: <textarea name="message"  disabled={!equal} placeholder="message" value={message} onChange={this.handleInput}></textarea></div>
          <div>Tag: <input type="text"  disabled={!equal} name="tag" placeholder="tag" value={tag} onChange={this.handleInput}></input></div>
          
          { is_Public ? <div>
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
                onChange={this.handleRadioButton} /></div> </div>:
               <div> <div className="radio">Public: 
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
                onChange={this.handleRadioButton} /></div> </div>
                    
          }

          { equal ? <div><input type="submit" value="Save speech" /></div> : <div></div> }
          
        </form>
        
      </div>
    )
  }
}

export default  withAuth(FormEdit);
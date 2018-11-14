import axios from 'axios';

class SpeechService {
  constructor() {
    this.speechService = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  }

  getSpeech() {
    // return this.speechService.get('/speeches')
    return this.speechService.get('/speeches?is_Public=true')
      .then(({ data }) => data )
  }
  
  getMySpeeches(idUser) {
    return this.speechService.get(`/speeches?owner=${idUser}`)
      .then(({ data }) => data )
  }

  // getMySpeeches(id) {
  //   return this.speechService.get(`/speeches?id=${id}`)
  //     .then(({ data }) => data )
  // }

  getSpeechId(id) {
    return this.speechService.get(`/speeches/${id}`)
      .then(({ data }) => data )
  }

  addSpeech(body) {
    return this.speechService.post('/speeches', body)
      .then(({ data }) => data )
  }

  addFavsSpeech(id, body) {
    return this.speechService.post(`/speeches/${id}`, body)
      .then(({ data }) => data )
  }

  getEditSpeechId(id,body) {
    return this.speechService.put(`/speeches/${id}`,body)
      .then(({ data }) => data )
  }

  deleteMySpeechId(id) {
    return this.speechService.delete(`/speeches/${id}`)
      .then(({ data }) => data )
  }

}

const speechService = new SpeechService();

export default speechService;
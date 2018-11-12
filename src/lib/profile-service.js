import axios from 'axios';

class ProfileService {
  constructor() {
    this.profileService = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    })
  } 

  getProfile(id) {
    // console.log('id', id)
    return this.profileService.get(`/profile/${id}`)
      .then (( { data } ) => data )
  }

  getEditProfile(id, body) {
    console.log('id put frontend', id)
    return this.profileService.put(`/profile/${id}`, body)
      .then (( { data } ) => data )
  }
}

const profileService = new ProfileService();

export default profileService;
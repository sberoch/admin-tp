import axios from "axios";
import firebase from '../config/firebase'

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      if (firebase.auth().currentUser) {
        const token = await firebase.auth().currentUser.getIdToken()
        localStorage.setItem("token", token)
        error.config.headers['Authorization'] = 'Bearer ' + token;
        return api.request(error.config)
      } else {
        //Redirect to login
        console.log('TODO: redirect to login')
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);


export default api;
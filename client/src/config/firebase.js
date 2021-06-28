import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAy0LnT-owgpZyk5eGfwA2mUKxT4Zq5__o",
  authDomain: "recue-me.firebaseapp.com",
  projectId: "recue-me",
  storageBucket: "recue-me.appspot.com",
  messagingSenderId: "253334489915",
  appId: "1:253334489915:web:f114830009f96cf2cc851e"
};

const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

export const auth = app.auth()
export const storage = app.storage()
export default app
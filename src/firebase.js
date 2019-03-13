import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


var config = {
  apiKey: "AIzaSyC_bKYjdwsgv8qR8dOtA0DO2gHNgim--Ao",
  authDomain: "react-slack-clone-efa3c.firebaseapp.com",
  databaseURL: "https://react-slack-clone-efa3c.firebaseio.com",
  projectId: "react-slack-clone-efa3c",
  storageBucket: "react-slack-clone-efa3c.appspot.com",
  messagingSenderId: "230033337392"
};
firebase.initializeApp(config);

export default firebase;
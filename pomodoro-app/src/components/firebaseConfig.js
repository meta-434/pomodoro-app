import firebase from "firebase";

const config = {
  apiKey: "AIzaSyANbMPf2LUJPxfcBd2xoUwqBrxWyL4MHGU",
  authDomain: "pomodoro-project-48cf7.firebaseapp.com",
  databaseURL: "https://pomodoro-project-48cf7.firebaseio.com",
  projectId: "pomodoro-project-48cf7",
  storageBucket: "pomodoro-project-48cf7.appspot.com",
  messagingSenderId: "950281586197",
  appId: "1:950281586197:web:21f296480d4f696b"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;

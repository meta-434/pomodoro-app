import firebase from "firebase";
const API_KEY = process.env.GOOGLE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "restaurant-searcher-ab59d.firebaseapp.com",
  databaseURL: "https://restaurant-searcher-ab59d.firebaseio.com",
  projectId: "restaurant-searcher-ab59d",
  storageBucket: "restaurant-searcher-ab59d.appspot.com",
  messagingSenderId: "150669636887",
  appId: "1:150669636887:web:74c6a07d081dc755"
};

firebase.initializeApp(firebaseConfig);

export default firebaseConfig;
